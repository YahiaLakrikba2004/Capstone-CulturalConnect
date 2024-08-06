import axios from 'axios';

const instance = axios.create({
  baseURL:'https://cultural-connect-hazel.vercel.app/api', // Aggiorna con l'URL del tuo backend
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

instance.interceptors.response.use(
  response => response,
  error => {
    // Puoi aggiungere una gestione degli errori globale qui
    if (error.response && error.response.status === 401) {
      // Azioni da intraprendere in caso di errore di autorizzazione (401)
      console.error('Token di autenticazione scaduto o non valido.');
      // Ad esempio: reindirizzare l'utente al login
    } else if (error.response && error.response.status === 500) {
      // Azioni da intraprendere in caso di errore del server (500)
      console.error('Errore del server.');
    } else {
      // Gestione degli altri errori
      console.error('Errore API:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
