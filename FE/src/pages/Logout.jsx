// src/pages/Logout.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, CircularProgress, Snackbar, Alert as MuiAlert } from '@mui/material'
import axios from 'axios'

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const Logout = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Simula una richiesta di logout se necessario
        // Se il tuo server gestisce il logout tramite API, decommenta la chiamata seguente
        // await axios.post('http://localhost:8080/api/logout', {}, {
        //   headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        // });

        // Rimuove il token di autenticazione dal localStorage
        localStorage.removeItem('authToken')
        setLoading(false) // Imposta lo stato di caricamento su false dopo aver rimosso il token
        navigate('/login') // Reindirizza alla pagina di login
      } catch (err) {
        console.error('Logout failed', err)
        setLoading(false) // Anche in caso di errore, ferma il caricamento
        setError('Logout failed. Please try again.') // Imposta un messaggio di errore
      }
    }

    handleLogout()
  }, [navigate])

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Logging out...
      </Typography>
      {loading && <CircularProgress />}
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  )
}

export default Logout
