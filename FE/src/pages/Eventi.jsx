import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert as MuiAlert,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
  TextField,
} from '@mui/material';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';
import { Star, StarBorder, Share, Favorite, FavoriteBorder } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';

// Animazioni
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

// Funzione di notifica per Alert
const AlertComponent = props => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [wishList, setWishList] = useState(new Set()); // Nuovo stato per la Lista dei Desideri
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const theme = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        if (Array.isArray(response.data)) {
          setEvents(response.data);
          setFilteredEvents(response.data);
        } else {
          throw new Error('I dati non sono un array');
        }
      } catch (error) {
        setError('Errore nel recupero degli eventi. Riprova più tardi.');
        toast.error('Errore nel recupero degli eventi.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter(
      event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [searchTerm, events]);

  const handleOpenModal = event => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const toggleFavorite = id => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleAddToWishList = id => {
    setWishList(prevWishList => {
      const newWishList = new Set(prevWishList);
      if (newWishList.has(id)) {
        newWishList.delete(id);
      } else {
        newWishList.add(id);
      }
      return newWishList;
    });
    toast.success('Evento aggiunto alla Lista dei Desideri!');
  };

  const handleShare = event => {
    const shareData = {
      title: event.title,
      text: `Scopri questo evento: ${event.title} - ${event.description}`,
      url: window.location.href,
    };
    navigator.share(shareData).catch(console.error);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchChange = event => setSearchTerm(event.target.value);

  const handlePageChange = page => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePurchaseTicket = () => {
    if (selectedEvent) {
      // Simula l'acquisto
      toast.success('Biglietto aggiunto al carrello!');
      // Per esempio, potrebbe essere interessante aggiornare lo stato per riflettere l'acquisto
      // In questo esempio, non ci sono cambiamenti nello stato
    }
  };

  // Calcolo della paginazione
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 2, fontWeight: 700, color: theme.palette.text.primary }}
        >
          Caricamento Eventi
        </Typography>
        <Box
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            boxShadow: 4,
            animation: `${fadeIn} 0.5s ease-in-out`,
          }}
        >
          <CircularProgress color="primary" size={60} />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
            Caricamento in corso...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 2, fontWeight: 700, color: theme.palette.text.primary }}
        >
          Eventi Recenti
        </Typography>
        <Box
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: '#ffe6e6',
            boxShadow: 4,
            animation: `${fadeIn} 0.5s ease-in-out`,
          }}
        >
          <AlertComponent
            severity="error"
            icon={<ErrorOutlineIcon />}
            sx={{ mb: 2, fontWeight: 500 }}
          >
            {error}
          </AlertComponent>
          <Button
            variant="contained"
            color="error"
            onClick={() => window.location.reload()}
          >
            Riprova
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      {/* Sezione Introduttiva */}
      <Box
        sx={{
          mt: { xs: 3, sm: 4 },
          mb: { xs: 4, sm: 6 },
          textAlign: 'center',
          py: { xs: 6, sm: 8 },
          px: { xs: 3, sm: 4 },
          bgcolor: theme.palette.background.paper,
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${theme.palette.divider}`,
          animation: `${fadeIn} 0.5s ease-in-out`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Eventi Recenti
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: theme.palette.text.secondary,
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
        >
          Scopri i prossimi eventi nella tua area e aggiungili alla tua lista dei desideri.
        </Typography>
        <TextField
          label="Cerca Evento"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />
      </Box>

      <Grid container spacing={3}>
        {currentEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  borderRadius: '8px',
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                  bgcolor: theme.palette.background.paper,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '600px',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.3)',
                  },
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={event.imageUrl}
                  alt={event.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    {format(parseISO(event.date), 'dd MMM yyyy')}
                  </Typography>
                </CardContent>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                  <Tooltip title={favorites.has(event.id) ? 'Rimuovi dai Preferiti' : 'Aggiungi ai Preferiti'}>
                    <IconButton
                      onClick={() => toggleFavorite(event.id)}
                      color={favorites.has(event.id) ? 'primary' : 'default'}
                      sx={{ transition: 'color 0.3s' }}
                    >
                      {favorites.has(event.id) ? <Star /> : <StarBorder />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={wishList.has(event.id) ? 'Rimuovi dalla Lista dei Desideri' : 'Aggiungi alla Lista dei Desideri'}>
                    <IconButton
                      onClick={() => handleAddToWishList(event.id)}
                      color={wishList.has(event.id) ? 'primary' : 'default'}
                      sx={{ transition: 'color 0.3s' }}
                    >
                      {wishList.has(event.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Condividi Evento">
                    <IconButton onClick={() => handleShare(event)} sx={{ transition: 'color 0.3s' }}>
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(event)}
                    sx={{ textTransform: 'none' }}
                  >
                    Dettagli
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Paginazione */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Precedente
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="contained"
          color="primary"
        >
          Successivo
        </Button>
      </Box>

      {/* Modale Evento */}
      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onClose={handleCloseModal} fullWidth maxWidth="sm">
          <DialogTitle>{selectedEvent.title}</DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              height="300"
              image={selectedEvent.imageUrl}
              alt={selectedEvent.title}
              sx={{ mb: 2, borderRadius: '8px', objectFit: 'cover' }}
            />
            <Typography variant="body1" paragraph>
              {selectedEvent.description}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
              {format(parseISO(selectedEvent.date), 'dd MMM yyyy')}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              <strong>Categoria:</strong> {selectedEvent.category}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              <strong>Organizzatore:</strong> {selectedEvent.organizer}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              <strong>Status:</strong> {selectedEvent.status}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              <strong>Prezzo Biglietto:</strong> €{selectedEvent.ticketPrice}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              <strong>Luogo:</strong> {selectedEvent.locationName}, {selectedEvent.locationAddress}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePurchaseTicket}
              sx={{ mt: 2 }}
            >
              Aggiungi al Carrello
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Chiudi</Button>
          </DialogActions>
        </Dialog>
      )}

      <ToastContainer autoClose={3000} position="bottom-right" />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Evento aggiunto alla Lista dei Desideri!"
      />
    </Container>
  );
};

export default Events;
