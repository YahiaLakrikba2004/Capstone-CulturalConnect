import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'

const Events = () => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events')
        if (Array.isArray(response.data)) {
          setEvents(response.data)
        } else {
          console.error('Expected an array for events')
          setError('Error loading events')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleOpenModal = event => {
    setSelectedEvent(event)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
  }

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Eventi Recenti
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" gutterBottom>
            Caricamento in corso...
          </Typography>
        </Paper>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Eventi Recenti
        </Typography>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Eventi Recenti
      </Typography>
      <Grid container spacing={4}>
        {events.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={event.imageUrl}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.location}
                </Typography>
                <Typography variant="body2" paragraph>
                  {event.description}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenModal(event)}
                >
                  Maggiori Dettagli
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onClose={handleCloseModal}>
          <DialogTitle>{selectedEvent.title}</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              {selectedEvent.date}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedEvent.location}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedEvent.description}
            </Typography>
            <Button onClick={handleCloseModal} color="primary">
              Chiudi
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  )
}

export default Events
