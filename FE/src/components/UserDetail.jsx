import React, { useEffect, useState } from 'react';
import { getUserById } from '../api/userApi'; // Assicurati che il percorso sia corretto
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Error fetching user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <Typography variant="h6">ID: {user.id}</Typography>
      <Typography variant="body1">Username: {user.username}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Role: {user.role}</Typography>
    </Box>
  );
};

export default UserDetail;
