import { Card, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// StyledCard component
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
  padding: theme.spacing(2), // Ridotto il padding per mobile
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  minHeight: '300px', // Altezza minima adattata per mobile
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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
  [theme.breakpoints.down('sm')]: {
    minHeight: '250px', // Altezza per schermi piccoli
  },
}));

// StyledCardMedia component
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    height: 150, // Altezza per schermi piccoli
  },
  '&:hover': {
    transform: 'scale(1.1)',
    filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'brightness(0.9)',
  },
}));

// StyledButton component
export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
  boxShadow: theme.shadows[3],
  textTransform: 'uppercase',
  fontWeight: 600,
  backgroundImage: theme.palette.mode === 'dark'
    ? `linear-gradient(to right, ${theme.palette.background.default}, ${theme.palette.background.paper})`
    : `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  border: 'none',
  '&:hover': {
    backgroundImage: theme.palette.mode === 'dark'
      ? `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`
      : `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[5],
  },
  '&:focus': {
    boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
  },
  '&:active': {
    backgroundImage: theme.palette.mode === 'dark'
      ? `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`
      : `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    boxShadow: theme.shadows[6],
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2), // Ridotto il padding per mobile
    fontSize: '0.875rem', // Font size per mobile
  },
}));
