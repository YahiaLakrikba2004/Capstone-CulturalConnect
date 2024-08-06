import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Alert,
  Box,
  Divider,
  CircularProgress,
} from '@mui/material';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  StyledCard,
  StyledCardMedia,
  StyledButton, // Assicurati che questo sia ben definito
} from '../components/StyledComponents';

// Animazioni
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleHover = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

// Stili per la Card
const cardStyles = {
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    animation: `${scaleHover} 0.3s ease-in-out`,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    filter: 'brightness(1.05)',
  },
};

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get('https://cultural-connect-hazel.vercel.app/api/connections'); // URL aggiornato
        if (Array.isArray(response.data)) {
          setConnections(response.data);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Errore nel recupero delle connessioni. Riprova più tardi.';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleConnect = (id) => {
    if (connecting === id) return;

    setConnecting(id);
    setTimeout(() => {
      toast.success('Connessione effettuata con successo!');
      setConnections(prevConnections => prevConnections.map(connection =>
        connection.id === id
          ? { ...connection, connected: true }
          : connection
      ));
      setConnecting(null);
    }, 1000);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" size={60} />
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
      <Box
        sx={{
          mt: { xs: 4, sm: 6 },
          mb: { xs: 4, sm: 6 },
          textAlign: 'center',
          py: { xs: 6, sm: 8 },
          px: { xs: 3, sm: 4 },
          bgcolor: '#f5f5f5',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #b0bec5',
          animation: `${fadeIn} 0.5s ease-in-out`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: '#37474f',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            textShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          Nuove Connessioni
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: '#546e7a',
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
        >
          Scopri e connettiti con persone che condividono i tuoi interessi.
        </Typography>
        <Divider
          sx={{
            mb: 4,
            mx: 'auto',
            width: { xs: '60px', sm: '80px' },
            borderBottomWidth: '4px',
            borderColor: '#37474f',
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {connections.map(connection => (
          <Grid item xs={12} sm={6} md={4} key={connection.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StyledCard sx={cardStyles}>
                <StyledCardMedia
                  component="img"
                  image={connection.imageUrl || 'https://via.placeholder.com/300'}
                  title={connection.name}
                  sx={{ height: 160, objectFit: 'cover', borderBottom: '4px solid #b0bec5' }}
                />
                <CardContent sx={{ height: 180 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#37474f' }}>
                    {connection.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {connection.interests.join(', ')}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {connection.bio}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-start', padding: 1 }}>
                  <StyledButton
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleConnect(connection.id)}
                    disabled={connection.connected || connecting === connection.id}
                  >
                    {connection.connected
                      ? 'Connesso'
                      : (connecting === connection.id ? 'Connessione in corso...' : 'Connettiti')}
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </Container>
  );
};

export default Connections;
