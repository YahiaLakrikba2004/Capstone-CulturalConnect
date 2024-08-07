// src/api/commentApi.js

import axios from './axiosInstance' // Assicurati che il percorso sia corretto

/**
 * Ottieni i commenti per un articolo specifico.
 *
 * @param {number} articleId - L'ID dell'articolo.
 * @returns {Promise} - La promessa con i commenti.
 */
export const getCommentsByArticleId = articleId => {
  return axios
    .get(`/comments/${articleId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Errore durante il recupero dei commenti:', error)
      throw error
    })
}

/**
 * Aggiungi un nuovo commento a un articolo.
 *
 * @param {number} articleId - L'ID dell'articolo.
 * @param {string} text - Il testo del commento.
 * @returns {Promise} - La promessa con il commento aggiunto.
 */
export const addComment = (articleId, text) => {
  return axios
    .post('/comments', { articleId, text })
    .then(response => response.data)
    .catch(error => {
      console.error("Errore durante l'aggiunta del commento:", error)
      throw error
    })
}
