import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const clientId = '655817798261-83kv1b2lo17vc4rbc5tfssekhrmch70o.apps.googleusercontent.com';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          const token = credentialResponse.credential;

          // Décoder le token
          const userInfo = jwtDecode(token);
          console.log('Utilisateur connecté :', userInfo);

          // Formater les données utilisateur de manière cohérente
          const formattedUser = {
            id: userInfo.sub,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            given_name: userInfo.given_name,
            family_name: userInfo.family_name,
            provider: 'google'
          };

          // Sauvegarde des données utilisateur
          localStorage.setItem('user', JSON.stringify(formattedUser));
          localStorage.setItem('login_time', Date.now().toString());

          // Afficher un message de succès
          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            text: `Bienvenue ${formattedUser.name} !`,
            confirmButtonText: 'Continuer'
          }).then(() => {
            navigate('/products');
          });
        }}
        onError={() => {
          console.log('Échec de la connexion');
          Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion',
            text: 'Impossible de se connecter avec Google. Veuillez réessayer.',
            confirmButtonText: 'OK'
          });
        }}
        theme="filled_black"
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
