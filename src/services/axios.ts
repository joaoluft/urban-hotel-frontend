
import axios from 'axios';

interface ErrorResponse {
  details?: string;
  message?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (error) {
      console.error('Erro ao carregar token:', error);
    }
  }
  return config;
});

// Interceptor para lidar com erros de autorização
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Remove a sessão do localStorage
      localStorage.removeItem('user');
      // Redireciona para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
