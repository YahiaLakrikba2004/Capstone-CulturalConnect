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
       
        localStorage.removeItem('authToken')
        setLoading(false) 
        navigate('/login') 
      } catch (err) {
        console.error('Logout failed', err)
        setLoading(false) 
        setError('Logout failed. Please try again.') 
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
