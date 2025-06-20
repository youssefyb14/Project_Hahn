import React from 'react';
import GoogleLoginButton from './GoogleLoginButton'; // Assure-toi que le chemin est correct

const LoginPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Connexion à l'application</h2>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
