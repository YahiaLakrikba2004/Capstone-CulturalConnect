import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Button,
  Alert,
  Box,
  Divider,
  CircularProgress,
} from '@mui/material'
import {
  StyledCard,
  StyledCardMedia,
  StyledButton,
} from '../components/StyledComponents'

const Connections = () => {
  const [connections, setConnections] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/connections'
        )
        if (Array.isArray(response.data)) {
          setConnections(response.data)
        } else {
          console.error('Expected an array for connections')
          setError('Error loading connections')
        }
      } catch (error) {
        console.error('Error fetching connections:', error)
        setError('Error fetching connections')
      } finally {
        setLoading(false)
      }
    }

    fetchConnections()
  }, [])

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Caricamento in corso...
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      {/* Sezione Iniziale */}
      <Box
        sx={{
          mt: 4,
          mb: 6,
          textAlign: 'center',
          py: 8,
          px: 4,
          bgcolor: '#fff8f1', // Sfondo molto chiaro per un contrasto delicato
          borderRadius: '16px', // Angoli arrotondati più pronunciati
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Ombra più accentuata
          border: '1px solid #e0d6cc', // Bordo sottile per definizione
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: '#4e342e', // Colore elegante per il titolo
            fontSize: '2.5rem', // Dimensione del font più grande
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Ombra del testo per maggiore leggibilità
          }}
        >
          Nuove Connessioni
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: '#6d4c41', // Colore del sottotitolo
            fontWeight: 400,
            fontSize: '1.2rem',
          }}
        >
          Scopri e connettiti con persone che condividono i tuoi interessi.
        </Typography>
        <Divider
          sx={{
            mb: 4,
            mx: 'auto',
            width: '80px',
            borderBottomWidth: '4px',
            borderColor: '#6d4c41',
          }}
        />
      </Box>

      {/* Connessioni */}
      <Box>
        <Grid container spacing={2}>
          {connections.map(connection => (
            <Grid item xs={12} sm={6} md={4} key={connection.id}>
              <StyledCard sx={{ height: 'auto', maxWidth: 345 }}>
                <StyledCardMedia
                  component="img"
                  image={connection.imageUrl}
                  title={connection.name}
                  sx={{ height: 140, objectFit: 'cover' }} // Altezza ridotta per immagini
                />
                <CardContent sx={{ height: 180 }}>
                  <Typography variant="h6" gutterBottom>
                    {connection.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {connection.interests.join(', ')}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {connection.bio}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-start', padding: 1 }}>
                  <StyledButton
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Connettiti
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Connections
