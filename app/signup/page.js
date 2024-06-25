"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: '',
    zipcode: '',
    newsletter: false
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiFormData = {
      email: formData.email,
      password: formData.password,
      password2: formData.passwordConfirmation,
      first_name: formData.firstName,
      last_name: formData.lastName,
      zipcode: formData.zipcode,
      newsletter: formData.newsletter
    };
  
    try {
      const response = await api.post('accounts/register/', apiFormData);
      console.log('Registration successful:', response.data);
      // After successful registration, log the user in
      const loginResponse = await api.post('accounts/login/', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', loginResponse.data.token);
      console.log('User logged in after registration');
      router.push('/profile');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      // Handle errors (e.g., display error messages)
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="emailConfirmation"
          placeholder="Confirm Email"
          value={formData.emailConfirmation}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="mr-2"
          />
          Sign up for newsletter
        </label>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Account
        </button>
      </form>
    </div>
  );}