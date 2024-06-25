'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      fetchUserData();
    } else {
      console.log('User is not logged in');
      router.push('/login');
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('accounts/user/');
      setUser(response.data);
      console.log('User data fetched successfully');
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('accounts/logout/');
      localStorage.removeItem('token');
      console.log('User logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.first_name}!</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Log out
      </button>
    </div>
  );
}