import { createTheme } from '@mui/material/styles';
import { Button, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

// Definisci i gradienti per ciascun tema
const gradients = {
  light: 'linear-gradient(to right, #ff8a65, #ff6f61)',
  dark: 'linear-gradient(to right, #333333, #666666)',
  blue: 'linear-gradient(to right, #2196f3, #64b5f6)',
  green: 'linear-gradient(to right, #43a047, #76c8a2)',
  orange: 'linear-gradient(to right, #ff9800, #ffb74d)',
};

// Funzione per creare un tema dinamico
const createDynamicTheme = (themeName) => {
  const gradient = gradients[themeName] || gradients.light;

  return createTheme({
    palette: {
      primary: {
        main: '#ff6f61',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#c1a67c',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f7f7f7',
        paper: '#ffffff',
      },
      text: {
        primary: '#4e342e',
        secondary: '#6d4c41',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#3e2723',
        marginBottom: '1rem',
        textTransform: 'uppercase',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        color: '#6d4c41',
        marginBottom: '0.75rem',
      },
      body1: {
        fontSize: '1rem',
        color: '#4e342e',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        color: '#6d4c41',
      },
      button: {
        textTransform: 'uppercase',
        fontWeight: 600,
        fontSize: '0.875rem',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '8px 16px',
            fontWeight: 600,
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            backgroundImage: gradient,
            '&:hover': {
              backgroundImage: gradient,
              color: '#ffffff',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: gradient,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  });
};

// Styled components
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.default,
  },
  '&:focus': {
    boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'brightness(0.9)',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
  boxShadow: theme.shadows[3],
  textTransform: 'uppercase',
  fontWeight: 600,
  backgroundImage: gradients.light, // Default gradient
  color: theme.palette.primary.contrastText,
  border: 'none',
  '&:hover': {
    backgroundImage: gradients.light,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[5],
  },
  '&:focus': {
    boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
  },
  '&:active': {
    backgroundImage: gradients.light, // Default gradient
    boxShadow: theme.shadows[6],
  },
}));

export default createDynamicTheme('light'); // Imposta il tema di default su 'light'
