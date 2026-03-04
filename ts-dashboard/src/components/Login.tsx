import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostApi } from '../hooks/useApi';
import { LoginRequest, AuthResponse } from '../types';
import GoogleAuth from './GoogleAuth';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const { execute, loading, error } = usePostApi<LoginRequest, AuthResponse>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await execute('/auth/login', formData);
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '1rem' }}>
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', marginTop: '1.5rem' }}>
            Sign in to your account
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {error && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.375rem' }}>
              {error}
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div>
              <input
                name="email"
                type="email"
                required
                style={{ 
                  appearance: 'none',
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem 0.375rem 0 0',
                  fontSize: '0.875rem',
                  color: '#111827',
                  backgroundColor: '#ffffff',
                  outline: 'none'
                }}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                style={{ 
                  appearance: 'none',
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0 0 0.375rem 0.375rem',
                  fontSize: '0.875rem',
                  color: '#111827',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  marginTop: '-1px'
                }}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem 1rem',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                color: '#ffffff',
                backgroundColor: loading ? '#9333ea' : '#6366f1',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#4f46e5';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#6366f1';
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <GoogleAuth />
        </form>
      </div>
    </div>
  );
};

export default Login;
