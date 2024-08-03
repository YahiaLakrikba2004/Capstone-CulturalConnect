import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState('/default-profile-pic.png');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsername(response.data.username);
        setProfilePicPreview(response.data.profilePic || '/default-profile-pic.png');
      } catch (err) {
        console.error('Failed to fetch profile', err);
        toast.error('Failed to fetch profile');
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    if (password) formData.append('password', password);
    if (newPassword) formData.append('newPassword', newPassword);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      const response = await axios.put(
        'http://localhost:8080/api/users/me/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfilePicPreview(response.data.profilePic || '/default-profile-pic.png');
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile', err);
      toast.error('Failed to update profile');
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
        setProfilePic(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Avatar
          alt="Profile Picture"
          src={profilePicPreview}
          sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleProfilePicChange}
            />
            <PhotoCamera />
          </IconButton>
        </Avatar>
        <form onSubmit={handleUpdate} style={{ marginTop: '16px' }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Current Password"
            variant="outlined"
            type="password"
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            type="password"
            margin="normal"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Profile'}
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Profile;
