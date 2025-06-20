import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ import correct

const clientId = '655817798261-83kv1b2lo17vc4rbc5tfssekhrmch70o.apps.googleusercontent.com';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          const token = credentialResponse.credential;

          // ✅ Décoder le token
          const userInfo = jwtDecode(token);
          console.log('Utilisateur connecté :', userInfo);

          // ✅ Sauvegarde des données utilisateur
          localStorage.setItem('user', JSON.stringify(userInfo));

          // ✅ Redirection
          navigate('/products');
        }}
        onError={() => {
          console.log('Échec de la connexion');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
