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
  Alert,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';
import { Star, StarBorder, Share } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Comments from '../components/comments'; // Assicurati che il percorso sia corretto

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
const AlertComponent = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/articles');
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          throw new Error('Dati non validi');
        }
      } catch (error) {
        setError('Errore nel recupero degli articoli. Riprova più tardi.');
        toast.error('Errore nel recupero degli articoli.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleOpenModal = (article) => setSelectedArticle(article);
  const handleCloseModal = () => setSelectedArticle(null);

  const toggleFavorite = (id) => {
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

  const handleShare = (article) => {
    const shareData = {
      title: article.title,
      text: `Leggi questo articolo: ${article.title} - ${article.content}`,
      url: window.location.href,
    };
    navigator.share(shareData)
      .then(() => {
        setSnackbarMessage('Articolo condiviso con successo!');
        setSnackbarOpen(true);
      })
      .catch(console.error);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 700, color: theme.palette.text.primary }}>
          Caricamento Articoli
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
        <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 700, color: theme.palette.text.primary }}>
          Articoli Recenti
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
          <Button variant="contained" color="error" onClick={() => window.location.reload()}>
            Riprova
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
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
          Articoli Recenti
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
          Scopri gli articoli recenti e rimani aggiornato sulle ultime novità.
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

      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
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
                  height: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                  animation: `${fadeIn} 0.5s ease-in-out`,
                }}
              >
                {article.imageUrl && (
                  <CardMedia
                    component="img"
                    image={article.imageUrl}
                    alt={article.title}
                    sx={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.content}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', gap: 1, p: 2, justifyContent: 'space-between' }}>
                  <Tooltip title={favorites.has(article.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}>
                    <IconButton
                      color={favorites.has(article.id) ? 'warning' : 'default'}
                      onClick={() => toggleFavorite(article.id)}
                    >
                      {favorites.has(article.id) ? <Star /> : <StarBorder />}
                    </IconButton>
                  </Tooltip>
                  <Button variant="contained" color="primary" onClick={() => handleOpenModal(article)} sx={{ flexGrow: 1 }}>
                    Leggi di più
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleShare(article)}>
                    <Share />
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {selectedArticle && (
        <Dialog open={Boolean(selectedArticle)} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedArticle.title}
          </DialogTitle>
          <DialogContent>
            {selectedArticle.imageUrl && (
              <CardMedia
                component="img"
                image={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                sx={{ mb: 2, borderRadius: 1, maxHeight: 400, objectFit: 'cover' }}
              />
            )}
            <Typography variant="body1" color="textPrimary" paragraph>
              {selectedArticle.content}
            </Typography>
            <Comments articleId={selectedArticle.id} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <AlertComponent onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </AlertComponent>
      </Snackbar>

      <ToastContainer />
    </Container>
  );
};

export default Articles;
