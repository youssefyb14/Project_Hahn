import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import GitHubLoginButton from './GitHubLoginButton';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Sign in to access your account</p>
        
        <div className="auth-buttons-container">
          <div className="google-login-container">
            <GoogleLoginButton />
          </div>
          
          <div className="auth-divider">or</div>
          
          <GitHubLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
