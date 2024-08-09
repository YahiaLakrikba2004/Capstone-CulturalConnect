import React, { useEffect, useState, useCallback } from 'react';
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
import { Star, StarBorder, Share, CalendarToday } from '@mui/icons-material';
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

  const handleShare = event => {
    const shareData = {
      title: event.title,
      text: `Scopri questo evento: ${event.title} - ${event.description}`,
      url: window.location.href,
    };
    navigator.share(shareData).catch(console.error);
  };

  const handleAddToCalendar = event => {
    const start = format(parseISO(event.date), "yyyyMMdd'T'HHmmss");
    const end = format(
      new Date(new Date(event.date).getTime() + 60 * 60 * 1000),
      "yyyyMMdd'T'HHmmss"
    );
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location || '')}`;
    window.open(calendarUrl, '_blank');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchChange = event => setSearchTerm(event.target.value);

  const handlePageChange = page => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
          }}
        >
          Scopri gli eventi recenti e rimani aggiornato sulle ultime novità.
        </Typography>
        <Divider
          sx={{
            mb: 4,
            mx: 'auto',
            width: { xs: '50px', sm: '70px' },
            borderBottomWidth: '4px',
            borderColor: theme.palette.primary.main,
          }}
        />
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Cerca per titolo o descrizione..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />
      </Box>

      {/* Eventi */}
      <Grid container spacing={4}>
        {currentEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  overflow: 'hidden',
                  height: '90vh',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                {event.imageUrl && (
                  <CardMedia
                    component="img"
                    image={event.imageUrl}
                    alt={event.title}
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                )}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700, color: theme.palette.text.primary }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    {format(parseISO(event.date), 'd MMMM yyyy HH:mm')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.location || 'Luogo non specificato'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Categoria: {event.category || 'Non specificata'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Organizzatore: {event.organizer || 'Non specificato'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {event.status || 'Non specificato'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Prezzo: {event.ticketPrice ? `${event.ticketPrice} €` : 'Gratuito'}
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                    {event.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      flexDirection: 'column',
                      mt: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Tooltip
                        title={
                          favorites.has(event.id)
                            ? 'Rimuovi dai preferiti'
                            : 'Aggiungi ai preferiti'
                        }
                      >
                        <IconButton
                          onClick={() => toggleFavorite(event.id)}
                          color={
                            favorites.has(event.id) ? 'primary' : 'default'
                          }
                        >
                          {favorites.has(event.id) ? <Star /> : <StarBorder />}
                        </IconButton>
                      </Tooltip>
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleShare(event)}
                        sx={{
                          padding: '20px 30px',
                          fontSize: '0.875rem',
                          borderRadius: '10px',
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.dark,
                          }
                        }}
                      >
                        <Share sx={{ mr: 1 }} />
                        Condividi
                      </Button>
                      <Button
                        size="medium"
                        variant="contained"
                        color="success"
                        onClick={() => handleAddToCalendar(event)}
                      >
                        <CalendarToday sx={{ mr: 1 }} />
                        Aggiungi al Calendario
                      </Button>
                    </Box>
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(event)}
                    >
                      Maggiori Dettagli
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Paginazione */}
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Precedente
        </Button>
        <Typography
          variant="body1"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Pagina {currentPage} di {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Successivo
        </Button>
      </Box>

      {/* Dettagli dell'Evento */}
      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          sx={{ 
            '& .MuiDialog-paper': { 
              borderRadius: 2, 
              overflow: 'hidden', 
              padding: 0
            },
            '& .MuiDialogContent-root': {
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 10,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
            }
          }}
        >
          <DialogTitle 
            sx={{
              fontWeight: 700, 
              bgcolor: theme.palette.primary.main, 
              color: theme.palette.common.white,
              py: 2,
              px: 3
            }}
          >
            {selectedEvent.title}
          </DialogTitle>
          <DialogContent 
            sx={{ 
              py: 4,
              px: 3
            }}
          >
            {selectedEvent.imageUrl && (
              <CardMedia
                component="img"
                image={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                sx={{
                  mb: 3,
                  borderRadius: 1,
                  objectFit: 'cover', 
                  width: '100%',
                  maxHeight: '300px',
                  height: 'auto',
                }}
              />
            )}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {format(parseISO(selectedEvent.date), 'd MMMM yyyy HH:mm')}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              <strong>Luogo:</strong> {selectedEvent.location || 'Luogo non specificato'}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              <strong>Categoria:</strong> {selectedEvent.category || 'Non specificata'}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              <strong>Organizzatore:</strong> {selectedEvent.organizer || 'Non specificato'}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              <strong>Status:</strong> {selectedEvent.status || 'Non specificato'}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              <strong>Prezzo:</strong> {selectedEvent.ticketPrice ? `${selectedEvent.ticketPrice} €` : 'Gratuito'}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              <strong>Descrizione:</strong> {selectedEvent.description}
            </Typography>
            {selectedEvent.contactEmail && (
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>Email di contatto:</strong> {selectedEvent.contactEmail}
              </Typography>
            )}
            {selectedEvent.contactPhone && (
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>Telefono di contatto:</strong> {selectedEvent.contactPhone}
              </Typography>
            )}
            {selectedEvent.website && (
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>Sito web:</strong> <a href={selectedEvent.website} target="_blank" rel="noopener noreferrer">{selectedEvent.website}</a>
              </Typography>
            )}
            {selectedEvent.mapLink && (
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>Mappa:</strong> <a href={selectedEvent.mapLink} target="_blank" rel="noopener noreferrer">Vedi sulla mappa</a>
              </Typography>
            )}
            {selectedEvent.program && (
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>Programma:</strong> {selectedEvent.program}
              </Typography>
            )}
            {selectedEvent.socialMedia && (
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                <strong>Seguici sui social:</strong>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  {selectedEvent.socialMedia.map((link, index) => (
                    <Tooltip key={index} title={`Visita ${link.platform}`}>
                      <IconButton
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={link.icon} alt={link.platform} style={{ width: 24, height: 24 }} />
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Typography>
            )}
          </DialogContent>
          <DialogActions 
            sx={{ 
              px: 3, 
              pb: 2 
            }}
          >
            <Button 
              onClick={handleCloseModal} 
              color="primary"
              variant="contained"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <ToastContainer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <AlertComponent onClose={handleSnackbarClose} severity="success">
          Evento aggiunto al calendario!
        </AlertComponent>
      </Snackbar>
    </Container>
  );
};

export default Events;
