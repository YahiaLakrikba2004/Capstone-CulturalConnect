import { Card, CardMedia, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled Card component with hover effects
export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3], 
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)', 
    boxShadow: theme.shadows[8], 
  },
  width: '100%', 
  minHeight: 350, 
}))

// Styled CardMedia component for images
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

// Styled Button component with hover effect
export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  boxShadow: theme.shadows[2],
  padding: theme.spacing(1, 2), 
  '&:hover': {
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.primary.dark, 
    color: theme.palette.getContrastText(theme.palette.primary.dark), 
  },
}))
