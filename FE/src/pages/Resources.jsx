import React from 'react'
import {
  Container,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
} from '@mui/material'
import {
  StyledCard,
  StyledCardMedia,
  StyledButton,
} from '../components/StyledComponents'

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'Guida agli Eventi Locali',
      description:
        'Scopri come trovare e organizzare eventi locali con successo. Una guida completa per ogni esigenza.',
      imageUrl: '/images/event_guide.png', // Sostituisci con l'URL dell'immagine appropriata
      link: 'https://www.eventbrite.com/blog/guide-to-local-events-ds00/', // Link di esempio
    },
    {
      id: 2,
      title: 'Strumenti per la Pianificazione di Eventi',
      description:
        'Esplora gli strumenti e le app migliori per gestire e promuovere i tuoi eventi in modo efficace.',
      imageUrl: '/images/event_tools.png', // Sostituisci con l'URL dell'immagine appropriata
      link: 'https://www.eventplanner.com/tools/', // Link di esempio
    },
    {
      id: 3,
      title: 'Guide al Networking',
      description:
        'Leggi le nostre guide su come costruire e mantenere una rete professionale solida.',
      imageUrl: '/images/networking_guide.png', // Sostituisci con l'URL dell'immagine appropriata
      link: 'https://www.forbes.com/sites/forbeshumanresourcescouncil/2020/03/10/how-to-build-and-maintain-your-professional-network/', // Link di esempio
    },
    {
      id: 4,
      title: 'Piattaforme per Connessioni Professionali',
      description:
        'Scopri le migliori piattaforme online per fare networking e connetterti con professionisti del tuo settore.',
      imageUrl: '/images/networking_platforms.png', // Sostituisci con l'URL dell'immagine appropriata
      link: 'https://www.linkedin.com/', // Link di esempio
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      {/* Sezione Iniziale */}
      <Box
        sx={{
          mt: 4,
          mb: 6,
          textAlign: 'center',
          py: 8,
          px: 4,
          bgcolor: '#f5f5f5', // Sfondo molto chiaro per un contrasto delicato
          borderRadius: '16px', // Angoli arrotondati più pronunciati
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Ombra più accentuata
          border: '1px solid #e0e0e0', // Bordo sottile per definizione
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: '#333', // Colore elegante per il titolo
            fontSize: '2.5rem', // Dimensione del font più grande
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Ombra del testo per maggiore leggibilità
          }}
        >
          Risorse
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: '#555', // Colore del sottotitolo
            fontWeight: 400,
            fontSize: '1.2rem',
          }}
        >
          Scopri risorse utili per approfondire i tuoi interessi culturali e
          professionali.
        </Typography>
        <Divider
          sx={{
            mb: 4,
            mx: 'auto',
            width: '80px',
            borderBottomWidth: '4px',
            borderColor: '#333',
          }}
        />
      </Box>

      {/* Risorse */}
      <Box>
        <Grid container spacing={2}>
          {resources.map(resource => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <StyledCard sx={{ height: 'auto', maxWidth: 345 }}>
                <StyledCardMedia
                  component="img"
                  image={resource.imageUrl}
                  title={resource.title}
                  sx={{ height: 140, objectFit: 'cover' }} // Altezza ridotta per immagini
                />
                <CardContent sx={{ height: 180 }}>
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {resource.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-start', padding: 1 }}>
                  <StyledButton
                    size="small"
                    color="primary"
                    variant="contained"
                    href={resource.link} // Aggiungi link alla risorsa
                    target="_blank" // Apre il link in una nuova scheda
                  >
                    Maggiori dettagli
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Resources
