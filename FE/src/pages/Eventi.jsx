import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
} from '@mui/material'
import { keyframes } from '@mui/system'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useTheme } from '@mui/material/styles'
import { Star, StarBorder, Share, CalendarToday } from '@mui/icons-material'
import MuiAlert from '@mui/material/Alert'
import { format, parseISO } from 'date-fns'

// Animazioni
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
}

// Funzione di notifica per Alert
const AlertComponent = props => (
  <MuiAlert elevation={6} variant="filled" {...props} />
)

const Events = () => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [favorites, setFavorites] = useState(new Set()) // Gestione degli eventi preferiti
  const [snackbarOpen, setSnackbarOpen] = useState(false) // Gestione Snackbar
  const theme = useTheme()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://cultural-connect-hazel.vercel.app/events')
        if (Array.isArray(response.data)) {
          setEvents(response.data)
        } else {
          throw new Error('I dati non sono un array')
        }
      } catch (error) {
        setError('Errore nel recupero degli eventi. Riprova più tardi.')
        toast.error('Errore nel recupero degli eventi.')
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

  const toggleFavorite = id => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const handleShare = event => {
    const shareData = {
      title: event.title,
      text: `Scopri questo evento: ${event.title} - ${event.description}`,
      url: window.location.href, // Link alla pagina dell'evento
    }
    navigator.share(shareData).catch(console.error)
  }

  const handleAddToCalendar = event => {
    const start = format(parseISO(event.date), "yyyyMMdd'T'HHmmss")
    const end = format(
      new Date(new Date(event.date).getTime() + 60 * 60 * 1000),
      "yyyyMMdd'T'HHmmss"
    )
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`
    window.open(calendarUrl, '_blank')
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

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
    )
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
    )
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
      </Box>

      {/* Eventi */}
      <Grid container spacing={4}>
        {events.map(event => (
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
                  animation: `${fadeIn} 0.5s ease-in-out`,
                }}
              >
                {event.imageUrl && (
                  <CardMedia
                    component="img"
                    image={event.imageUrl}
                    alt={event.title}
                    sx={{
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
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
                    {event.location}
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                    {event.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      flexDirection: 'column',
                      mt: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleShare(event)}
                      >
                        <Share sx={{ mr: 1 }} />
                        Condividi
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleAddToCalendar(event)}
                      >
                        <CalendarToday sx={{ mr: 1 }} />
                        Aggiungi al Calendario
                      </Button>
                    </Box>
                    <Button
                      size="small"
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

      {/* Modale Dettagli Evento */}
      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          sx={{ '& .MuiDialog-paper': { borderRadius: 2, overflow: 'hidden' } }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>
            {selectedEvent.title}
          </DialogTitle>
          <DialogContent>
            {selectedEvent.imageUrl && (
              <CardMedia
                component="img"
                height="200"
                image={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                sx={{ mb: 2, borderRadius: 1, objectFit: 'cover' }}
              />
            )}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {format(parseISO(selectedEvent.date), 'd MMMM yyyy HH:mm')}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedEvent.location}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedEvent.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
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
  )
}

export default Events
