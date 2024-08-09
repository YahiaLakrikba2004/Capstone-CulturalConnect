import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import {
  Container,
  Typography,
  FormControlLabel,
  Switch,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import globalTheme from '../styles/theme'; // Assicurati che questo import sia corretto
import { StyledCard, StyledCardMedia, StyledButton } from '../components/StyledComponents'; // Importa i componenti stilizzati

// Temi predefiniti
const themes = {
  light: {
    backgroundColor: '#f5f5f5',
    color: '#212121',
    primaryColor: '#1976d2',
    secondaryColor: '#ff4081',
    dividerColor: '#e0e0e0',
  },
  dark: {
    backgroundColor: '#121212',
    color: '#e0e0e0',
    primaryColor: '#bb86fc',
    secondaryColor: '#03dac6',
    dividerColor: '#373737',
  },
  blue: {
    backgroundColor: '#e3f2fd',
    color: '#0d47a1',
    primaryColor: '#2196f3',
    secondaryColor: '#64b5f6',
    dividerColor: '#bbdefb',
  },
  green: {
    backgroundColor: '#e8f5e9',
    color: '#1b5e20',
    primaryColor: '#43a047',
    secondaryColor: '#76c8a2',
    dividerColor: '#c8e6c9',
  },
  orange: {
    backgroundColor: '#fff3e0',
    color: '#e65100',
    primaryColor: '#ff9800',
    secondaryColor: '#ffb74d',
    dividerColor: '#ffcc80',
  }
};

// Stili generali
const generalStyles = {
    container: {
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      },
    },
    formControl: {
      marginTop: '1.5rem',
      minWidth: '200px',
      '& .MuiInputLabel-root': {
        color: '#1976d2',
      },
      '& .MuiInputBase-root': {
        borderRadius: '8px',
        backgroundColor: '#f0f4f8',
      },
    },
    divider: {
      margin: '2rem 0',
      backgroundColor: '#1976d2',
    },
    button: {
      marginTop: '1.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      backgroundColor: '#1976d2',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#1565c0',
      },
    },
  };

// Opzioni per il layout
const layoutOptions = [
  { value: 'default', label: 'Default Layout' },
  { value: 'compact', label: 'Compact Layout' },
  { value: 'expanded', label: 'Expanded Layout' },
];

const Settings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Usa useNavigate
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Anche se non utilizzato, tenuto per completezza
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [highContrast, setHighContrast] = useState(false);
  const [layout, setLayout] = useState('default');

  // Carica le impostazioni iniziali
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedNotifications = localStorage.getItem('notifications') === 'true';
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedProfileVisibility = localStorage.getItem('profileVisibility') || 'public';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedLayout = localStorage.getItem('layout') || 'default';

    setTheme(savedTheme);
    setNotifications(savedNotifications);
    setLanguage(savedLanguage);
    setProfileVisibility(savedProfileVisibility);
    setHighContrast(savedHighContrast);
    setLayout(savedLayout);

    // Imposta il tema alla pagina
    if (themes[savedTheme]) {
      document.body.style.backgroundColor = themes[savedTheme].backgroundColor;
      document.body.style.color = themes[savedTheme].color;
    }
  }, []);

  // Applica il tema alla pagina
  useEffect(() => {
    if (themes[theme]) {
      document.body.style.backgroundColor = themes[theme].backgroundColor;
      document.body.style.color = themes[theme].color;
    }
  }, [theme]);

  // Salva le impostazioni e reindirizza
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('notifications', notifications.toString());
      localStorage.setItem('language', language);
      localStorage.setItem('profileVisibility', profileVisibility);
      localStorage.setItem('highContrast', highContrast.toString());
      localStorage.setItem('layout', layout);
      enqueueSnackbar('Settings saved successfully!', { variant: 'success' });
      navigate('/'); // Reindirizza alla home page
    } catch (err) {
      console.error('Failed to save settings:', err);
      enqueueSnackbar('Failed to save settings', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Crea il tema applicabile
  const themeToApply = createTheme({
    ...globalTheme,
    palette: {
      ...globalTheme.palette,
      background: {
        default: themes[theme]?.backgroundColor || themes.light.backgroundColor,
        paper: themes[theme]?.backgroundColor || themes.light.backgroundColor,
      },
      text: {
        primary: themes[theme]?.color || themes.light.color,
        secondary: themes[theme]?.color || themes.light.color,
      },
      primary: {
        main: themes[theme]?.primaryColor || themes.light.primaryColor,
      },
      secondary: {
        main: themes[theme]?.secondaryColor || themes.light.secondaryColor,
      },
      divider: themes[theme]?.dividerColor || themes.light.dividerColor,
    },
  });

  return (
    <ThemeProvider theme={themeToApply}>
  <Container
    maxWidth="sm"
    style={{
      ...generalStyles.container,
      backgroundColor: themes[theme]?.backgroundColor || themes.light.backgroundColor,
      color: themes[theme]?.color || themes.light.color,
    }}
  >
    <Typography variant="h4" gutterBottom>
      Settings
    </Typography>

    <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Theme
      </Typography>
      <FormControl fullWidth sx={{ ...generalStyles.formControl, mb: 2 }}>
        <InputLabel>Theme</InputLabel>
        <Select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          label="Theme"
        >
          {Object.keys(themes).map(themeKey => (
            <MenuItem key={themeKey} value={themeKey}>
              {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ ...generalStyles.divider, mb: 2 }} />

      <Typography variant="h6" gutterBottom>
        Profile Visibility
      </Typography>
      <FormControl fullWidth sx={{ ...generalStyles.formControl, mb: 2 }}>
        <InputLabel>Profile Visibility</InputLabel>
        <Select
          value={profileVisibility}
          onChange={(e) => setProfileVisibility(e.target.value)}
          label="Profile Visibility"
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="friends">Friends</MenuItem>
        </Select>
      </FormControl>

      <Divider sx={{ ...generalStyles.divider, mb: 2 }} />

      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            color="primary"
          />
        }
        label="Notifications"
        sx={{ mb: 2 }}
      />

      <Divider sx={{ ...generalStyles.divider, mb: 2 }} />

      <Typography variant="h6" gutterBottom>
        Accessibility
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            color="primary"
          />
        }
        label="High Contrast"
        sx={{ mb: 2 }}
      />

      <Divider sx={{ ...generalStyles.divider, mb: 2 }} />

      <Typography variant="h6" gutterBottom>
        Layout
      </Typography>
      <FormControl fullWidth sx={{ ...generalStyles.formControl, mb: 2 }}>
        <InputLabel>Layout</InputLabel>
        <Select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          label="Layout"
        >
          {layoutOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={generalStyles.button}
        >
          {loading ? <CircularProgress size={24} /> : 'Save Settings'}
        </Button>
      </Box>
    </Box>
        {/* Renderizza i componenti stilizzati basati sul layout */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: layout === 'compact' ? 'row' : 'column' }}>
            <StyledCard>
              <StyledCardMedia
                image="https://via.placeholder.com/400x200"
                title="Card Media"
              />
              <Typography variant="h6" gutterBottom>
                Card Title
              </Typography>
              <Typography variant="body2" color="textSecondary">
                This is a sample card to show the layout effect.
              </Typography>
              <StyledButton>
                Sample Button
              </StyledButton>
            </StyledCard>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Settings;
