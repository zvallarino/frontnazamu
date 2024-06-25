'use client'

import { createContext, useState, useContext, useEffect } from 'react';
import api, { setAuthToken } from '../../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaleVisible, setIsSaleVisible] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('accounts/user/');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('accounts/login/', { email, password });
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    await fetchUser();
  };

  const logout = async () => {
    try {
      await api.post('accounts/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setAuthToken(null);
      setUser(null);
    }
  };

  const toggleSaleBanner = () => {
    setIsSaleVisible(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isSaleVisible, 
      toggleSaleBanner 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);