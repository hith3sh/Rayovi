import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Youtube, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface YouTubeProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
  channelId?: string;
  channelTitle?: string;
  subscriberCount?: number;
  videoCount?: number;
}

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<YouTubeProfile | null>(null);
  const [step, setStep] = useState<'processing' | 'fetching' | 'complete' | 'error'>('processing');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        setError(`Authentication failed: ${error}`);
        setStep('error');
        setLoading(false);
        return;
      }

      if (!code || state !== 'youtube_auth') {
        setError('Invalid authentication response');
        setStep('error');
        setLoading(false);
        return;
      }

      try {
        setStep('processing');
        
        // Exchange code for access token
        const tokenResponse = await exchangeCodeForToken(code);
        
        if (!tokenResponse.access_token) {
          throw new Error('Failed to obtain access token');
        }

        setStep('fetching');
        
        // Fetch user profile and YouTube data
        const userProfile = await fetchUserProfile(tokenResponse.access_token);
        
        setProfile(userProfile);
        setStep('complete');
        
        // Store user data (in a real app, you'd send this to your backend)
        localStorage.setItem('user_profile', JSON.stringify(userProfile));
        localStorage.setItem('access_token', tokenResponse.access_token);
        
        toast("Welcome to Rayovi!", {
          description: "Your YouTube account has been successfully connected.",
        });

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);

      } catch (err) {
        console.error('Authentication error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setStep('error');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  const exchangeCodeForToken = async (code: string) => {
    // In a real application, this should be done on your backend for security
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '', // This should be on backend
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/auth/callback`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return response.json();
  };

  const fetchUserProfile = async (accessToken: string): Promise<YouTubeProfile> => {
    // Fetch basic user info
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const userInfo = await userInfoResponse.json();

    // Fetch YouTube channel info
    let channelInfo = {};
    try {
      const channelResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (channelResponse.ok) {
        const channelData = await channelResponse.json();
        if (channelData.items && channelData.items.length > 0) {
          const channel = channelData.items[0];
          channelInfo = {
            channelId: channel.id,
            channelTitle: channel.snippet.title,
            subscriberCount: parseInt(channel.statistics.subscriberCount || '0'),
            videoCount: parseInt(channel.statistics.videoCount || '0'),
          };
        }
      }
    } catch (err) {
      console.warn('Failed to fetch YouTube channel info:', err);
    }

    return {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      ...channelInfo,
    };
  };

  const getStepIcon = () => {
    switch (step) {
      case 'processing':
      case 'fetching':
        return <Loader2 className="h-8 w-8 text-primary animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-destructive" />;
      default:
        return <Youtube className="h-8 w-8 text-primary" />;
    }
  };

  const getStepMessage = () => {
    switch (step) {
      case 'processing':
        return 'Processing your authentication...';
      case 'fetching':
        return 'Fetching your YouTube profile data...';
      case 'complete':
        return 'Successfully connected your YouTube account!';
      case 'error':
        return 'Authentication failed';
      default:
        return 'Connecting...';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="card-letterboxd">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                {getStepIcon()}
              </div>

              {/* Title and Message */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {step === 'complete' ? 'Welcome!' : 'Setting up your account'}
                </h1>
                <p className="text-muted-foreground">
                  {getStepMessage()}
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert className="border-destructive/50 text-destructive text-left">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Profile Preview */}
              {profile && step === 'complete' && (
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={profile.picture} 
                      alt={profile.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                  </div>
                  
                  {profile.channelTitle && (
                    <div className="text-left space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        YouTube Channel: {profile.channelTitle}
                      </p>
                      {profile.subscriberCount !== undefined && (
                        <p className="text-xs text-muted-foreground">
                          {profile.subscriberCount.toLocaleString()} subscribers • {' '}
                          {profile.videoCount?.toLocaleString() || 0} videos
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Progress Steps */}
              {step !== 'error' && (
                <div className="space-y-2">
                  <div className="flex justify-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      ['processing', 'fetching', 'complete'].includes(step) ? 'bg-primary' : 'bg-muted'
                    }`} />
                    <div className={`w-2 h-2 rounded-full ${
                      ['fetching', 'complete'].includes(step) ? 'bg-primary' : 'bg-muted'
                    }`} />
                    <div className={`w-2 h-2 rounded-full ${
                      step === 'complete' ? 'bg-primary' : 'bg-muted'
                    }`} />
                  </div>
                  {step === 'complete' && (
                    <p className="text-sm text-muted-foreground">
                      Redirecting you to the home page...
                    </p>
                  )}
                </div>
              )}

              {/* Error Actions */}
              {step === 'error' && (
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="w-full btn-letterboxd"
                  >
                    Try Again
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full btn-letterboxd-outline"
                  >
                    Continue as Guest
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthCallbackPage;