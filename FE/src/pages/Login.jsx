import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext'; // Assicurati che il percorso sia corretto
import { motion } from 'framer-motion';

// Varianti di animazione
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa il contesto di autenticazione

  useEffect(() => {
    // Disabilita lo scrolling del body quando il modulo è visibile
    document.body.style.overflow = 'hidden';
    return () => {
      // Ripristina lo scrolling quando il modulo non è più visibile
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', { username: email, password });
        login(response.data.token); // Usa la funzione di login dal contesto
        toast.success('Login successful');
        navigate('/dashboard'); // Reindirizza all'area protetta dopo il login
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        toast.error('Login failed');
    } finally {
        setLoading(false);
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
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background semi-transparent
            zIndex: 1, // Ensure the form is above the background
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5, fontSize: '1rem' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </motion.div>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default Login;
