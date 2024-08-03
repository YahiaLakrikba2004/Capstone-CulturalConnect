// src/api/userApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Crea un'istanza di axios per configurare default e interceptors
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Timeout dopo 10 secondi
});

// Interceptor per aggiungere il token di autenticazione, se disponibile
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken'); // O dove memorizzi il token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Gestione degli errori a livello globale
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Aggiungi logica di gestione degli errori globali qui
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const getProfile = () => apiClient.get('/users/profile');
