// src/pages/EventDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material'

const EventDetail = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/events/${id}`
        )
        setEvent(response.data)
      } catch (error) {
        console.error('Error fetching event data:', error)
        setError("Errore nel caricamento dei dati dell'evento")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Caricamento in corso...
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  if (!event) {
    return null
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={event.imageUrl}
          alt={event.title}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {event.date} - {event.location}
          </Typography>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.history.back()}
          >
            Torna indietro
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}

export default EventDetail
