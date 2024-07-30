import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6d4c41', // Marrone terroso
      light: '#a89f91', // Beige sabbia
      dark: '#3e2723', // Marrone scuro
      contrastText: '#ffffff', // Bianco per contrasto
    },
    secondary: {
      main: '#c1a67c', // Oro pallido
      light: '#e5d8b7', // Beige chiaro
      dark: '#9b7c4e', // Marrone dorato
      contrastText: '#ffffff', // Bianco per contrasto
    },
    background: {
      default: '#f7f7f7', // Grigio chiaro
      paper: '#ffffff', // Bianco
    },
    text: {
      primary: '#4e342e', // Grigio scuro marrone
      secondary: '#6d4c41', // Marrone terroso
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#3e2723', // Marrone scuro per titoli principali
      marginBottom: '1rem',
      textTransform: 'uppercase', // Maggiore impatto visivo
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#6d4c41', // Marrone terroso per sottotitoli
      marginBottom: '0.75rem',
    },
    body1: {
      fontSize: '1rem',
      color: '#4e342e', // Grigio scuro marrone per testo principale
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6d4c41', // Marrone terroso per testo secondario
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '0.875rem', // Dimensione del testo dei bottoni
    },
  },
  shape: {
    borderRadius: 12, // Angoli arrotondati più evidenti
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Angoli arrotondati per i bottoni
          padding: '8px 16px', // Spaziatura interna più definita
          fontWeight: 600,
          textTransform: 'uppercase',
          transition: 'all 0.3s ease', // Transizione dolce per gli effetti hover
          '&:hover': {
            backgroundColor: '#9b7c4e', // Colore di sfondo in hover
            color: '#ffffff', // Colore del testo in hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Angoli arrotondati per le card
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Ombra più marcata per profondità
          transition: 'transform 0.3s ease', // Transizione dolce per gli effetti hover
          '&:hover': {
            transform: 'scale(1.03)', // Effetto di zoom per le card
          },
        },
      },
    },
  },
})

export default theme
