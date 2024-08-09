import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Password reset instructions sent to your email.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to send password reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage:
          'url(https://info.ehl.edu/hubfs/Cultural-Diversity-Accomodation.jpg)',
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
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{
              mt: 2,
              mb: 3,
              fontWeight: 700,
              color: 'primary.main',
              background: 'linear-gradient(to right, #ff8a65, #ff6f61)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
              display: 'inline-block',
              padding: '0 0.5rem',
            }}
          >
            Forgot Password
          </Typography>
          <form onSubmit={handleForgotPassword}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              inputProps={{ 'aria-label': 'email' }}
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
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-12px',
                      marginTop: '-12px',
                    }}
                  />
                  Sending instructions...
                </>
              ) : (
                'Send Instructions'
              )}
            </Button>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default ForgotPassword;
