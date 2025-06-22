import React from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa';

const clientId = '655817798261-83kv1b2lo17vc4rbc5tfssekhrmch70o.apps.googleusercontent.com';

const GoogleLoginButtonInner = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log('Google login response:', credentialResponse);
      
      try {
        // Utiliser l'access token pour récupérer les informations utilisateur
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            'Authorization': `Bearer ${credentialResponse.access_token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        
        const userInfo = await response.json();
        console.log('User info from Google API:', userInfo);
        
        // Formater les données utilisateur de manière cohérente
        const formattedUser = {
          id: userInfo.id,
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
          title: 'Login successful',
          text: `Welcome ${formattedUser.name}!`,
          confirmButtonText: 'Continue'
        }).then(() => {
          navigate('/products');
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
        Swal.fire({
          icon: 'error',
          title: 'Login error',
          text: 'Failed to retrieve user information from Google.',
          confirmButtonText: 'OK'
        });
      }
    },
    onError: () => {
      console.log('Login failed');
      Swal.fire({
        icon: 'error',
        title: 'Login error',
        text: 'Unable to connect with Google. Please try again.',
        confirmButtonText: 'OK'
      });
    },
    scope: 'email profile openid',
    flow: 'implicit',
    ux_mode: 'popup',
    popup_closed_by_user: true,
    auto_select: false
  });

  return (
    <button className="google-login-button" onClick={() => login()}>
      <FaGoogle size={20} />
      Login with Google
    </button>
  );
};

const GoogleLoginButton = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLoginButtonInner />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
