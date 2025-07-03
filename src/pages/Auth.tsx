import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Youtube, User, Video, List, Heart, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Google OAuth configuration
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
  const REDIRECT_URI = `${window.location.origin}/auth/callback`;
  
  // YouTube Data API scopes
  const SCOPES = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ].join(' ');

  useEffect(() => {
    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    if (!consentGiven) {
      setError('Please consent to data access before continuing.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Construct Google OAuth URL
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', SCOPES);
      authUrl.searchParams.set('access_type', 'offline');
      authUrl.searchParams.set('prompt', 'consent');
      authUrl.searchParams.set('state', 'youtube_auth');

      // Redirect to Google OAuth
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('OAuth error:', error);
      setError('Failed to initiate authentication. Please try again.');
      setIsLoading(false);
    }
  };

  const permissions = [
    {
      icon: User,
      title: 'Basic Profile Information',
      description: 'Your name, email, and profile picture to create your account'
    },
    {
      icon: Youtube,
      title: 'YouTube Channel Data',
      description: 'Access to your YouTube channel information and statistics'
    },
    {
      icon: Video,
      title: 'Video Preferences',
      description: 'Your liked videos and watch history to personalize recommendations'
    },
    {
      icon: List,
      title: 'Playlists & Subscriptions',
      description: 'Your playlists and subscriptions to enhance your experience'
    }
  ];

  const benefits = [
    'Personalized video recommendations based on your YouTube activity',
    'Import your existing YouTube playlists and liked videos',
    'Connect with friends who share similar video interests',
    'Track and rate videos you\'ve watched',
    'Create and share custom video lists'
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            <Youtube className="h-8 w-8" />
            Rayovi
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Join the Community
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect your YouTube account to get started with personalized recommendations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Benefits */}
          <div className="space-y-6">
            <Card className="card-letterboxd">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Heart className="h-5 w-5 text-primary" />
                  Why Connect Your YouTube Account?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-letterboxd">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Your Privacy Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  We only access the data you explicitly consent to. Your information is never shared 
                  with third parties and you can revoke access at any time.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secured with industry-standard encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Authentication */}
          <div className="space-y-6">
            <Card className="card-letterboxd">
              <CardHeader>
                <CardTitle className="text-foreground">Data Access Permissions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  We'll request access to the following information:
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {permissions.map((permission, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <permission.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">{permission.title}</h4>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Consent and Sign In */}
            <Card className="card-letterboxd">
              <CardContent className="pt-6 space-y-6">
                {error && (
                  <Alert className="border-destructive/50 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="consent" 
                      checked={consentGiven}
                      onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I consent to Rayovi accessing my YouTube profile data, including my channel information, 
                      liked videos, playlists, and subscriptions to enhance my experience on the platform. 
                      I understand I can revoke this access at any time.
                    </label>
                  </div>

                  <Button 
                    onClick={handleGoogleSignIn}
                    disabled={!consentGiven || isLoading}
                    className="w-full btn-letterboxd flex items-center gap-3 h-12"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Youtube className="h-5 w-5" />
                        Continue with YouTube
                      </>
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full btn-letterboxd-outline"
                    onClick={() => navigate('/')}
                  >
                    Continue as Guest
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    By continuing, you agree to our{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Already have an account?{' '}
                    <button className="text-primary hover:underline">Sign in here</button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;