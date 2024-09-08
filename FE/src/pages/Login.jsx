import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link as MuiLink
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Varianti di animazione
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });

      const token = response.data.token;
      if (rememberMe) {
        document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 30}`; // Cookie valido per 30 giorni
      } else {
        document.cookie = `authToken=${token}; path=/; max-age=${60 * 60}`; // Cookie valido per 1 ora
      }

      login(token, rememberMe);
      toast.success('Login effettuato con successo');
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      setLoading(false);
      
      // Personalizzazione del messaggio di errore basato sul codice di stato
      if (error.response && error.response.status === 401) {
        toast.error('Utente non esistente o password errata');
      } else if (error.response && error.response.status === 403) {
        toast.error('Accesso negato');
      } else {
        toast.error('Errore durante il login: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://info.ehl.edu/hubfs/Cultural-Diversity-Accomodation.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: 24,
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              mt: 2,
              mb: 2,
              fontWeight: 700,
              color: 'primary.main',
              background: 'linear-gradient(to right, #ff8a65, #ff6f61)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
              display: 'inline-block',
              padding: '0 0.5rem',
            }}
          >
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                  borderRadius: '50%', 
                  padding: 1, 
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                  },
                  transition: 'background-color 0.3s ease', 
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Ricordami"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5, fontSize: '1rem', position: 'relative' }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                <MuiLink
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #feb47b, #ff7e5f)',
                    backgroundClip: 'text',
                    textDecoration: 'none',
                    fontWeight: 400,
                    '&:hover': {
                      textDecoration: 'underline',
                      fontWeight: 700,
                    },
                  }}
                >
                  Forgot Password?
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </motion.div>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default Login;
