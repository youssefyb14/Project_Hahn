import React from 'react';
import { FaGithub } from 'react-icons/fa';

const GitHubLoginButton = () => {
  const clientId = 'Ov23li9pt2Xuta97h9NK'; // Remplace par ton client ID GitHub

  const handleGitHubLogin = () => {
    // URL de callback qui doit correspondre à la route dans App.js
    // ET à la configuration dans GitHub OAuth App
    const redirectUri = 'http://localhost:3000/github/callback';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${encodeURIComponent(redirectUri)}`;

    console.log('=== GITHUB AUTH DEBUG ===');
    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);
    console.log('Full Auth URL:', githubAuthUrl);
    console.log('========================');
    
    // Rediriger l'utilisateur vers GitHub pour l'authentification
    window.location.href = githubAuthUrl;
  };

  return (
    <button className="github-login-button" onClick={handleGitHubLogin}>
      <FaGithub size={20} />
      Connexion avec GitHub
    </button>
  );
};

export default GitHubLoginButton;
