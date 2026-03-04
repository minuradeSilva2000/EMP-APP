import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userStr = urlParams.get('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        login(token, user);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to parse user data:', error);
        navigate('/login?error=invalid_callback');
      }
    } else {
      navigate('/login?error=no_token');
    }
  }, [navigate, login]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f9fafb' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }}></div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Completing authentication...
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
