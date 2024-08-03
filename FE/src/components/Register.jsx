import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
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
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
