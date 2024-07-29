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

const Explore = () => {
  const [events, setEvents] = useState([])
  const [connections, setConnections] = useState([])
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, connectionsResponse, articlesResponse] =
          await Promise.all([
            axios.get('http://localhost:8080/api/events'),
            axios.get('http://localhost:8080/api/connections'),
            axios.get('http://localhost:8080/api/articles'),
          ])

        if (Array.isArray(eventsResponse.data)) {
          setEvents(eventsResponse.data)
        } else {
          console.error('Expected an array for events')
          setError('Error loading events')
        }

        if (Array.isArray(connectionsResponse.data)) {
          setConnections(connectionsResponse.data)
        } else {
          console.error('Expected an array for connections')
          setError('Error loading connections')
        }

        if (Array.isArray(articlesResponse.data)) {
          setArticles(articlesResponse.data)
        } else {
          console.error('Expected an array for articles')
          setError('Error loading articles')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
      
      <Box
        sx={{
          mb: 6,
          mt: 8, 
          textAlign: 'center',
          py: 4,
          px: 2,
          borderRadius: 1,
          backgroundColor: 'primary.light',
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.contrastText',
            mb: 2,
          }}
        >
          Esplora le Nostre Offerte
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: 'primary.contrastText',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6, 
          }}
        >
          Scopri gli eventi, le connessioni e gli articoli più recenti che
          abbiamo selezionato per te. Approfitta delle nostre offerte e rimani
          aggiornato sulle novità.
        </Typography>
      </Box>

      {/* Eventi */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          Eventi
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={4}>
          {events.map(event => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={event.imageUrl}
                  title={event.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {event.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {event.location}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-start', padding: 2 }}>
                  <StyledButton
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Maggiori dettagli
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Connessioni */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          Connessioni
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={4}>
          {connections.map(connection => (
            <Grid item xs={12} sm={6} md={4} key={connection.id}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={connection.imageUrl}
                  title={connection.name}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
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
                <CardActions sx={{ justifyContent: 'flex-start', padding: 2 }}>
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

      {/* Articoli */}
      <Box>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          Articoli
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={4}>
          {articles.map(article => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={article.imageUrl}
                  title={article.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {article.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {article.content}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-start', padding: 2 }}>
                  <StyledButton
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Leggi di più
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ height: 50 }} />
    </Container>
  )
}

export default Explore
