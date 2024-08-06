import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from '@mui/material';
import Carousel from '../components/Carousel'; // Assicurati che il percorso sia corretto

const Explore = () => {
  const [events, setEvents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openArticleDialog, setOpenArticleDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, connectionsResponse, articlesResponse] =
          await Promise.all([
            axios.get('http://localhost:8080/api/events'),
            axios.get('http://localhost:8080/api/connections'),
            axios.get('http://localhost:8080/api/articles'),
          ]);

        if (Array.isArray(eventsResponse.data)) {
          setEvents(eventsResponse.data);
        } else {
          throw new Error('Expected an array for events');
        }

        if (Array.isArray(connectionsResponse.data)) {
          setConnections(connectionsResponse.data);
        } else {
          throw new Error('Expected an array for connections');
        }

        if (Array.isArray(articlesResponse.data)) {
          setArticles(articlesResponse.data);
        } else {
          throw new Error('Expected an array for articles');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenDetails = (event) => {
    setSelectedEvent(event);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedEvent(null);
  };

  const handleConnect = (connection) => {
    setConnectionMessage(`Hai inviato una richiesta di connessione a ${connection.name}.`);
    setTimeout(() => setConnectionMessage(''), 3000);
  };

  const handleOpenArticleDetails = (article) => {
    setSelectedArticle(article);
    setOpenArticleDialog(true);
  };

  const handleCloseArticleDetails = () => {
    setOpenArticleDialog(false);
    setSelectedArticle(null);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Caricamento in corso...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
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
          bgcolor: '#fff8f1',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0d6cc',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: '#4e342e',
            fontSize: '3.5rem',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          Esplora le Nostre Offerte
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 4,
            color: '#6d4c41',
            fontWeight: 400,
            fontSize: '1.5rem',
          }}
        >
          Scopri una vasta gamma di eventi, connessioni e articoli per arricchire la tua esperienza culturale.
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

      {/* Eventi */}
      <Carousel
        title="Eventi"
        items={events.map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
          location: event.location,
          description: event.description,
          imageUrl: event.imageUrl || '', // Assicurati che imageUrl non sia null
          onClick: () => handleOpenDetails(event),
          buttonText: 'Maggiori dettagli',
        }))}
      />

      {/* Connessioni */}
      <Carousel
        title="Connessioni"
        items={connections.map((connection) => ({
          id: connection.id,
          title: connection.name,
          description: connection.bio,
          imageUrl: connection.imageUrl || '', // Assicurati che imageUrl non sia null
          onClick: () => handleConnect(connection),
          buttonText: 'Connettiti',
        }))}
      />
      {connectionMessage && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {connectionMessage}
        </Alert>
      )}

      {/* Articoli */}
      <Carousel
        title="Articoli"
        items={articles.map((article) => ({
          id: article.id,
          title: article.title,
          date: article.date,
          description: article.content,
          imageUrl: article.imageUrl || '', // Assicurati che imageUrl non sia null
          onClick: () => handleOpenArticleDetails(article),
          buttonText: 'Leggi di più',
        }))}
      />

      {/* Modale Dettagli Evento */}
      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Dettagli Evento</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography variant="h5">{selectedEvent.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedEvent.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {selectedEvent.date} - {selectedEvent.location}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modale Dettagli Articolo */}
      <Dialog
        open={openArticleDialog}
        onClose={handleCloseArticleDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Dettagli Articolo</DialogTitle>
        <DialogContent>
          {selectedArticle && (
            <>
              <Typography variant="h5">{selectedArticle.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedArticle.description}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseArticleDetails} color="primary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Explore;
