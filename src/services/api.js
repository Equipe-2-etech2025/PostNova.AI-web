import axios from 'axios';

// Configuration de base d'Axios
const getApiBaseUrl = () => {
  // En développement, utiliser la variable d'environnement
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  }
  
  // En production, utiliser l'URL de production
  return import.meta.env.VITE_API_URL || '/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔗 URL API configurée:', API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      //window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
