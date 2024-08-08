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
  Grid,
  useMediaQuery,
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

  const isMobile = useMediaQuery('(max-width:600px)'); // Verifica se il dispositivo è mobile

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, connectionsResponse, articlesResponse] = await Promise.all([
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

  const renderCardGrid = (items, type) => (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Box
            sx={{
              p: 2,
              border: '1px solid #e0d6cc',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              bgcolor: '#fff',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {item.description}
            </Typography>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  margin: '8px 0',
                  objectFit: 'cover',
                }}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={item.onClick}
              sx={{ mt: 2 }}
            >
              {item.buttonText}
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      {/* Sezione Iniziale */}
      <Box
        sx={{
          mt: 4,
          mb: 6,
          textAlign: 'center',
          py: 4,
          px: 2,
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
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
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
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
          }}
        >
          Scopri una vasta gamma di eventi, connessioni e articoli per
          arricchire la tua esperienza culturale.
        </Typography>
        <Divider
          sx={{
            mb: 4,
            mx: 'auto',
            width: { xs: '60px', sm: '80px' },
            borderBottomWidth: '4px',
            borderColor: '#6d4c41',
          }}
        />
      </Box>
      
      {/* Eventi */}
      {isMobile ? (
        renderCardGrid(
          events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            imageUrl: event.imageUrl || '', // Assicurati che imageUrl non sia null
            onClick: () => handleOpenDetails(event),
            buttonText: 'Maggiori dettagli',
          })),
          'event'
        )
      ) : (
        <Carousel
          title="Eventi"
          items={events.map(event => ({
            id: event.id,
            title: event.title,
            date: event.date,
            location: event.location,
            description: event.description,
            imageUrl: event.imageUrl || '', // Assicurati che imageUrl non sia null
            onClick: () => handleOpenDetails(event),
            buttonText: 'Maggiori dettagli',
          }))}
          sx={{
            '& .carousel-item': {
              padding: { xs: '8px', sm: '16px' },
            },
            '& img': {
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
            },
          }}
        />
      )}

      {/* Connessioni */}
      {isMobile ? (
        renderCardGrid(
          connections.map(connection => ({
            id: connection.id,
            title: connection.name,
            description: connection.bio,
            Interests: connection.Interests,
            gender: connection.gender,
            imageUrl: connection.imageUrl || '', // Assicurati che imageUrl non sia null
            onClick: () => handleConnect(connection),
            buttonText: 'Connettiti',
          })),
          'connection'
        )
      ) : (
        <Carousel
          title="Connessioni"
          items={connections.map(connection => ({
            id: connection.id,
            title: connection.name,
            description: connection.bio,
            imageUrl: connection.imageUrl || '', // Assicurati che imageUrl non sia null
            onClick: () => handleConnect(connection),
            buttonText: 'Connettiti',
          }))}
          sx={{
            '& .carousel-item': {
              padding: { xs: '8px', sm: '16px' },
            },
            '& img': {
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
            },
          }}
        />
      )}

      {connectionMessage && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {connectionMessage}
        </Alert>
      )}

      {/* Articoli */}
      {isMobile ? (
        renderCardGrid(
          articles.map(article => ({
            id: article.id,
            title: article.title,
            description: article.content,
            imageUrl: article.imageUrl || '', // Assicurati che imageUrl non sia null
            onClick: () => handleOpenArticleDetails(article),
            buttonText: 'Leggi di più',
          })),
          'article'
        )
      ) : (
        <Carousel
          title="Articoli"
          items={articles.map(article => ({
            id: article.id,
            title: article.title,
            date: article.date,
            description: article.content,
            imageUrl: article.imageUrl || '', // Assicurati che imageUrl non sia null
            onClick: () => handleOpenArticleDetails(article),
            buttonText: 'Leggi di più',
          }))}
          sx={{
            '& .carousel-item': {
              padding: { xs: '8px', sm: '16px' },
            },
            '& img': {
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
            },
          }}
        />
      )}

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
              {selectedEvent.imageUrl && (
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    objectFit: 'cover',
                  }}
                />
              )}
              <Typography variant="h5">{selectedEvent.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedEvent.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {selectedEvent.date ? new Date(selectedEvent.date).toLocaleDateString() : ''} - {selectedEvent.location}
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
              {selectedArticle.imageUrl && (
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '8px 0',
                    objectFit: 'cover',
                  }}
                />
              )}
              <Typography variant="h5">{selectedArticle.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedArticle.content}
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
