import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme(); 

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${id}`);
        if (response.data) {
          setEvent(response.data);
        } else {
          setError("Evento non trovato.");
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dati dell\'evento:', error);
        setError("Errore nel caricamento dei dati dell'evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Caricamento in corso...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          Nessun evento trovato
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        {event.imageUrl && (
          <CardMedia
            component="img"
            height="400"
            image={event.imageUrl}
            alt={event.title}
            sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.text.primary }}>
            {event.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {event.date} - {event.location}
          </Typography>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.history.back()}
              sx={{ borderRadius: 2 }}
            >
              Torna indietro
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetail;
