import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const GitHubCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
   
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    console.log('GitHub Callback - Code:', code);
    console.log('GitHub Callback - Error:', error);

    if (error) {
      // Ne rien faire, ne pas afficher de popup d'erreur
      navigate('/login');
      return;
    }

    if (code) {
      console.log('Tentative d\'échange du code contre un token...');
      axios.post('http://localhost:8080/api/auth/github', { code })
        .then(response => {
          console.log('Réponse du backend:', response.data);
          const { user, token } = response.data;
          if (!user || !token) {
            // Ne rien faire, ne pas afficher de popup d'erreur
            navigate('/login');
            return;
          }
          // Formater les données utilisateur de manière cohérente
          const formattedUser = {
            id: user.id,
            name: user.name || user.login,
            email: user.email,
            picture: user.avatar_url,
            login: user.login,
            provider: 'github'
          };
          // Sauvegarder les données utilisateur
          localStorage.setItem('user', JSON.stringify(formattedUser));
          localStorage.setItem('github_token', token);
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
        })
        .catch(() => {
          // Ne rien faire, ne pas afficher de popup d'erreur
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Connexion en cours...</h1>
        <p className="login-subtitle">Authentification avec GitHub</p>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        </div>
      </div>
    </div>
  );
};

export default GitHubCallbackPage;
