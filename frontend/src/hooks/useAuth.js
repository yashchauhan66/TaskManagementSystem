import { useState, useCallback } from 'react';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const fetchUserData = useCallback(async (token) => {
    try {
      const data = await authAPI.getUserData(token);
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';
    const body = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const data = await authAPI[endpoint](body);
      
      if (isLogin) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.token; 
      } else {
        alert('Signup successful! Please login.');
        setIsLogin(true);
        setFormData({ ...formData, password: '' });
      }
    } catch (error) {
      console.error('Auth error details:', error);
      alert('Network error. Please check if backend is running on port 5000.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setFormData({ name: '', email: '', password: '', role: 'user' });
  };

  return {
    user,
    isLogin,
    setIsLogin,
    formData,
    setFormData,
    handleAuth,
    handleLogout,
    fetchUserData
  };
};
