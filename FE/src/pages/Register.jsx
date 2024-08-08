import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Varianti di animazione
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Disabilita lo scrolling del body quando il modulo di registrazione è visibile
    document.body.style.overflow = 'hidden';
    return () => {
      // Ripristina lo scrolling quando il modulo di registrazione non è più visibile
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8080/api/auth/register', user);
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      setError('Error creating user');
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
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>
          {error && <Typography color="error" align="center">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Role"
              name="role"
              value={user.role}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
              fullWidth
            >
              Register
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
