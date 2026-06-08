import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

// Interceptor — har request se pehle yeh chalega
// Automatic token header mein daal dega — har jagah alag se likhne ki zaroorat nahi
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
