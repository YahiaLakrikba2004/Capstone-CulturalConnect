import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import { StyledCard } from '../components/StyledComponents';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    name: 'Giulia Marconi',
    text: 'CulturalConnect mi ha aiutato a scoprire eventi fantastici nella mia città che non avrei mai trovato altrimenti. È una risorsa incredibile!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Matteo Ferrari',
    text: "Un'app fantastica per restare aggiornato su tutto ciò che accade nella comunità. La funzione di ricerca è super utile!",
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Elena Conti',
    text: "CulturalConnect è l'app ideale per trovare eventi interessanti e scoprire nuove opportunità culturali nella mia zona. Ogni aggiornamento è una piacevole sorpresa!",
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

const Testimonials = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box sx={{ my: 8, px: 2 }}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: titleInView ? 1 : 0, y: titleInView ? 0 : -50 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 60 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.5rem' },
            color: 'text.primary',
          }}
        >
          Cosa Dicono i Nostri Utenti
        </Typography>
      </motion.div>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
                textAlign: 'center',
                p: 4,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <Avatar
                alt={testimonial.name}
                src={testimonial.image}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 3,
                  border: (theme) => `4px solid ${theme.palette.primary.main}`,
                  boxShadow: 3,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary',
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                }}
              >
                {testimonial.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.5,
                  px: 2,
                }}
              >
                "{testimonial.text}"
              </Typography>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
