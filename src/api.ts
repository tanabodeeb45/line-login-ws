import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:3001/api',
});

const token = localStorage.getItem('accessToken');
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/';
    }
    return Promise.reject(err);
  },
);

export default api;
