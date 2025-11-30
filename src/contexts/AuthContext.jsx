import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fakeApiCall = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@webkelas.com' && password === 'password') {
          resolve({
            ok: true,
            data: {
              user: { id: 1, name: 'Siswa Test', email: 'test@webkelas.com' },
              token: 'fake-jwt-token',
            },
          });
        } else {
          reject({ message: 'Email atau password salah!' });
        }
      }, 1000);
    });
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fakeApiCall(email, password);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fakeApiCall(email, password);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: 1, name: 'Siswa Test', email: 'test@webkelas.com' });
    }
    setLoading(false);
  }, []);

  const value = { user, login, register, logout, loading, error };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
