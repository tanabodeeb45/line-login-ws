import React from 'react';

const LineLoginButton = () => {
  const clientId = 'YOUR_LINE_CLIENT_ID'; // Replace with your actual LINE client ID
  const redirectUri = encodeURIComponent('http://localhost:3000/line-callback'); // Replace with your actual redirect URI
  const state = 'random-state-123'; 
  const nonce = 'random-nonce-abc';
  const scope = 'profile openid email'; // Adjust scopes as needed

  const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&nonce=${nonce}`;

  const handleLineLogin = () => {
  sessionStorage.removeItem('line-login-used');
  window.location.href = loginUrl;
};

  return (
    <button onClick={handleLineLogin}>
      Login with LINE
    </button>
  );
};

export default LineLoginButton;
