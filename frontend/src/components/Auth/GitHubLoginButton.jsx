import React from 'react';
import { FaGithub } from 'react-icons/fa';

const GitHubLoginButton = () => {
  const clientId = 'Ov23li9pt2Xuta97h9NK'; 

  const handleGitHubLogin = () => {
    const redirectUri = 'http://localhost:3000/github/callback';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${encodeURIComponent(redirectUri)}`;

    console.log('=== GITHUB AUTH DEBUG ===');
    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);
    console.log('Full Auth URL:', githubAuthUrl);
    console.log('========================');
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
