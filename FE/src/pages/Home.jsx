import React from 'react'
import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { StyledCard, StyledButton } from '../components/StyledComponents'

const Home = () => {
  return (
    <Container>
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Benvenuti in CulturalConnect
        </Typography>
        <Typography variant="h6" paragraph>
          La tua piattaforma per connetterti con la cultura e gli eventi locali.
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 5, mb: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Esplora le nostre funzionalità
        </Typography>
        <Typography variant="body1" paragraph>
          Scopri tutto ciò che abbiamo da offrire: eventi culturali, opportunità
          di networking e molto altro.
        </Typography>
        <StyledButton
          variant="contained"
          color="primary"
          component={Link}
          to="/explore"
        >
          Esplora Ora
        </StyledButton>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Eventi Recenti</Typography>
            <Typography variant="body2" paragraph>
              Resta aggiornato sui prossimi eventi culturali e sociali.
            </Typography>
            <StyledButton variant="outlined" component={Link} to="/events">
              Vedi Eventi
            </StyledButton>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Nuove Connessioni</Typography>
            <Typography variant="body2" paragraph>
              Trova e connettiti con persone che condividono i tuoi interessi.
            </Typography>
            <StyledButton variant="outlined" component={Link} to="/connections">
              Scopri
            </StyledButton>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Risorse</Typography>
            <Typography variant="body2" paragraph>
              Accedi a risorse e strumenti utili per i tuoi interessi culturali.
            </Typography>
            <StyledButton variant="outlined" component={Link} to="/resources">
              Esplora Risorse
            </StyledButton>
          </StyledCard>
        </Grid>
      </Grid>
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} CulturalConnect. Tutti i diritti
          riservati.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Link to="/terms">Termini e Condizioni</Link> |{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
