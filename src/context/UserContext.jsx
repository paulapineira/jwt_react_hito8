import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem('token', data.token);
      setErrorMessage('');
    } else {
      setErrorMessage(data.error);
      throw new Error(data.error);
    }
  };

  const register = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem('token', data.token);
      setErrorMessage('');
    } else {
      setErrorMessage(data.error);
      throw new Error(data.error);
    }
  };

  const logout = () => {
    setToken(null);
    setEmail('');
    localStorage.removeItem('token');
    setErrorMessage('');
  };

  const getProfile = async () => {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile, errorMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


