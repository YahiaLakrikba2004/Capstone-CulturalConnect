import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}))

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))

const EventCard = ({ event }) => (
  <StyledCard>
    <StyledCardMedia
      component="img"
      image={event.imageUrl}
      title={event.title}
    />
    <CardContent>
      <Typography variant="h6">{event.title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {event.date}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {event.location}
      </Typography>
      <Typography variant="body2" paragraph>
        {event.description}
      </Typography>
    </CardContent>
    <CardActions>
      <StyledButton size="small" color="primary">
        Maggiori dettagli
      </StyledButton>
    </CardActions>
  </StyledCard>
)

export default EventCard
