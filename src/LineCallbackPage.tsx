import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import socket from './socket';

const LineCallbackPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing) return;

    const handleLogin = async () => {
      setIsProcessing(true);

      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        alert('Missing LINE code');
        navigate('/');
        return;
      }

      try {
        const { data } = await api.post('/auth/line-login', { code });
        const { accessToken } = data;

        localStorage.setItem('accessToken', accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        socket.auth = { token: accessToken };

        navigate('/dashboard');
      } catch (err) {
        console.error('Login failed:', err);
        alert('Login failed');
        navigate('/');
      }
    };

    handleLogin();
  }, [navigate, isProcessing]);

  return <div>กำลังเข้าสู่ระบบผ่าน LINE...</div>;
};

export default LineCallbackPage;
