import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const GoogleAuth: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    try {
      // Redirect to Google OAuth - this is the correct approach for OAuth
      window.location.href = 'http://localhost:5000/api/auth/google';
    } catch (error) {
      console.error('Google login failed:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', borderTop: '1px solid #d1d5db' }}></div>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <span style={{ padding: '0 0.5rem', backgroundColor: '#f9fafb', fontSize: '0.875rem', color: '#6b7280' }}>
            Or continue with
          </span>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            backgroundColor: '#ffffff',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }
          }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <svg
                style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GoogleAuth;
