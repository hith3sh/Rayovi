import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SCOPES = 'openid email profile https://www.googleapis.com/auth/youtube.readonly';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        scope: SCOPES,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        { theme: 'outline', size: 'large' }
      );
    } else {
      // Wait for script to load
      setTimeout(() => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse,
            scope: SCOPES,
          });
          window.google.accounts.id.renderButton(
            document.getElementById('google-signin-btn'),
            { theme: 'outline', size: 'large' }
          );
        }
      }, 500);
    }
    // eslint-disable-next-line
  }, []);

  function handleCredentialResponse(response) {
    // response.credential is the ID token
    const idToken = response.credential;
    // Send to backend for verification and user creation
    fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', idToken);
          navigate('/');
        } else {
          alert('Authentication failed.');
        }
      })
      .catch(() => alert('Authentication failed.'));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Sign in with Google</h1>
      <div id="google-signin-btn"></div>
    </div>
  );
};

export default Auth;
