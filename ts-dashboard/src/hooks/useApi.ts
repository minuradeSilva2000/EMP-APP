import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Use React Router navigation instead of full page reload
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const useApi = <T>(url: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (requestConfig?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<T>(url, { ...config, ...requestConfig });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, [url]);

  return { data, loading, error, execute };
};

export const usePostApi = <T, R = any>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (url: string, data: T): Promise<R> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<R>(url, data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};

export const usePutApi = <T, R = any>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (url: string, data: T): Promise<R> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put<R>(url, data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};

export const useDeleteApi = <R = any>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (url: string): Promise<R> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete<R>(url);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};

export default api;
