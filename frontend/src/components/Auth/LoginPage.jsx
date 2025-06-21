import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import GitHubLoginButton from './GitHubLoginButton';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenue</h1>
        <p className="login-subtitle">Connectez-vous pour accéder à votre espace</p>
        
        <div className="auth-buttons-container">
          <div className="google-login-container">
            <GoogleLoginButton />
          </div>
          
          <div className="auth-divider">ou</div>
          
          <GitHubLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
