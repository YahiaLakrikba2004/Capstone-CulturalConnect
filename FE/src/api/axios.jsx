// src/api/axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.cultural-connect-hazel.vercel.app/api', // Assicurati che questo sia l'URL corretto
  withCredentials: true, // Mantieni questa opzione se il backend richiede l'invio di cookie con le richieste
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
