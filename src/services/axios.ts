import axios  from 'axios';

interface ErrorResponse {
  details?: string;
  message?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default api;