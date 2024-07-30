import { Card, CardMedia, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled Card component with subtle effects
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition:
    'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper, // Neutro
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.background.default, // Lighter neutral on hover
  },
}))

// Styled CardMedia component for images with zoom effect
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}))

// Styled Button component with subtle effects
export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 3),
  transition:
    'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
  boxShadow: theme.shadows[2],
  textTransform: 'uppercase',
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main, // Accento di colore principale
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[4],
  },
}))
