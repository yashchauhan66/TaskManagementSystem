import React from 'react';
import Auth from '../components/Auth';
import '../styles/LoginPage.css';

const LoginPage = ({ 
  isLogin, 
  setIsLogin, 
  formData, 
  setFormData, 
  handleAuth 
}) => {
  return (
    <div className="login-page">
      <Auth 
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        formData={formData}
        setFormData={setFormData}
        handleAuth={handleAuth}
      />
    </div>
  );
};

export default LoginPage;
