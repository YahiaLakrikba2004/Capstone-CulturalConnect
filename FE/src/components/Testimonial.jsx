import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material'
import { StyledCard } from '../components/StyledComponents'

const testimonials = [
  {
    name: 'Giulia Marconi',
    text: 'CulturalConnect mi ha aiutato a scoprire eventi fantastici nella mia città che non avrei mai trovato altrimenti. È una risorsa incredibile!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg', // Immagine di esempio per una donna
  },
  {
    name: 'Matteo Ferrari',
    text: "Un'app fantastica per restare aggiornato su tutto ciò che accade nella comunità. La funzione di ricerca è super utile!",
    image: 'https://randomuser.me/api/portraits/men/1.jpg', // Immagine di esempio per un uomo
  },
  {
    name: 'Elena Conti',
    text: "CulturalConnect è l'app ideale per trovare eventi interessanti e scoprire nuove opportunità culturali nella mia zona. Ogni aggiornamento è una piacevole sorpresa!",
    image: 'https://randomuser.me/api/portraits/women/2.jpg', // Immagine di esempio per una donna
  },
]

const Testimonials = () => {
  return (
    <Box sx={{ my: 8, px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Cosa Dicono i Nostri Utenti
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                textAlign: 'center',
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Avatar
                  alt={testimonial.name}
                  src={testimonial.image}
                  sx={{ width: 60, height: 60, mb: 2, mx: 'auto' }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  "{testimonial.text}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Testimonials
