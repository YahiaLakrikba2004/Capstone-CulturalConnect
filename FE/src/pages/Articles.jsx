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
  Snackbar,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination
} from '@mui/material';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';
import { Star, StarBorder, Search } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Comments from '../components/comments';

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

const ArticleCard = ({ article, favorites, toggleFavorite, onOpenModal }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4} key={article.id}>
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => onOpenModal(article)}
              aria-label={`Leggi di più su ${article.title}`}
              sx={{ flexGrow: 1 }}
            >
              Leggi di più
            </Button>
          </Box>
        </Card>
      </motion.div>
    </Grid>
  );
};

const ArticleDialog = ({ article, onClose }) => (
  <Dialog open={Boolean(article)} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>{article?.title}</DialogTitle>
    <DialogContent>
      {article?.imageUrl && (
        <CardMedia
          component="img"
          image={article.imageUrl}
          alt={article.title}
          sx={{ mb: 2, borderRadius: 1, maxHeight: 400, objectFit: 'cover' }}
        />
      )}
      <Typography variant="body1" color="textPrimary" paragraph>
        {article?.content}
      </Typography>
      <Comments articleId={article?.id} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Chiudi</Button>
    </DialogActions>
  </Dialog>
);

const ErrorAlert = ({ errorMessage, onRetry }) => (
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
    <AlertComponent severity="error" icon={<ErrorOutlineIcon />} sx={{ mb: 2, fontWeight: 500 }}>
      {errorMessage}
    </AlertComponent>
    <Button variant="contained" color="error" onClick={onRetry}>Riprova</Button>
  </Box>
);

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1); // Stato per la pagina corrente
  const [articlesPerPage, setArticlesPerPage] = useState(6); // Numero di articoli per pagina
  const theme = useTheme();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(new Set(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/articles');
      if (Array.isArray(response.data)) {
        setArticles(response.data);
        setFilteredArticles(response.data);
        const uniqueCategories = [...new Set(response.data.map(article => article.category))];
        setCategories(uniqueCategories);
      } else {
        throw new Error('Dati non validi');
      }
    } catch (error) {
      const errorMessage = error.response?.status === 404
        ? 'Articoli non trovati.'
        : error.response?.status === 500
        ? 'Errore del server. Riprova più tardi.'
        : 'Errore nella richiesta degli articoli. Riprova più tardi.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article =>
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || article.category === selectedCategory)
    );
    setFilteredArticles(filtered);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, articles]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = (article) => {
    if (article) {
      setSelectedArticle(article);
      window.scrollTo(0, 0); // Scrolla verso l'alto quando il modal è aperto
    }
  };

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
        <ErrorAlert errorMessage={error} onRetry={() => window.location.reload()} />
      </Container>
    );
  }

  // Pagina corrente e articoli da mostrare per pagina
  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

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
        <TextField
          variant="outlined"
          placeholder="Cerca articoli..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {paginatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onOpenModal={handleOpenModal}
          />
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {selectedArticle && (
        <ArticleDialog article={selectedArticle} onClose={handleCloseModal} />
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
