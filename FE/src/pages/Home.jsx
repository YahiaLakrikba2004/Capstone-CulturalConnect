import React, { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { StyledCard, StyledButton } from '../components/StyledComponents'
import { Event, People, LibraryBooks, Close } from '@mui/icons-material'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonial'
import Logo from '../styles/Logo.jpg' // Importa l'immagine qui

// Hero Section Background Image
const heroBackground =
  'https://info.ehl.edu/hubfs/Cultural-Diversity-Accomodation.jpg'

const Home = () => {
  // Stato per gestire la visibilità del modale
  const [openModal, setOpenModal] = useState(false)

  // Funzioni per aprire e chiudere il modale
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <div>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            py: { xs: 8, sm: 10 },
            textAlign: 'center',
            bgcolor: 'secondary.main',
            borderRadius: 3,
            mt: 3,
            mb: 8,
            mx: 'auto',
            position: 'relative',
            overflow: 'hidden',
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '450px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 150px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Sfondo semitrasparente
              padding: 3,
              borderRadius: 2,
              maxWidth: '80%',
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '3.5rem' },
                color: '#ffffff',
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)', // Ombra del testo
              }}
            >
              Benvenuti in CulturalConnect
            </Typography>
            <Typography
              variant="h6"
              paragraph
              sx={{
                maxWidth: '90%',
                margin: '0 auto',
                fontSize: { xs: '1rem', sm: '1.5rem' },
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Ombra del testo
              }}
            >
              La tua piattaforma per connetterti con la cultura e gli eventi
              locali.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              component={Link}
              to="/explore"
              sx={{ mt: 3, fontSize: '1rem', px: 4 }}
            >
              Esplora Ora
            </StyledButton>
          </Box>
        </Box>

        {/* Grid Section */}
        <Grid container spacing={4}>
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              elevation={12}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
              }}
            >
              <Event sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700, mt: 2 }}
              >
                Eventi Recenti
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ color: 'text.secondary', px: 2 }}
              >
                Resta aggiornato sui prossimi eventi culturali e sociali.
              </Typography>
              <StyledButton
                variant="outlined"
                component={Link}
                to={`/event-details/1`} // Usa un ID dinamico
                sx={{ mt: 2, px: 4 }}
              >
                Leggi di più
              </StyledButton>
            </StyledCard>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              elevation={12}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
              }}
            >
              <People sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700, mt: 2 }}
              >
                Nuove Connessioni
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ color: 'text.secondary', px: 2 }}
              >
                Trova e connettiti con persone che condividono i tuoi interessi.
              </Typography>
              <StyledButton
                variant="outlined"
                component={Link}
                to="/connections"
                sx={{ mt: 2, px: 4 }}
              >
                Scopri
              </StyledButton>
            </StyledCard>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              elevation={12}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
              }}
            >
              <LibraryBooks sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700, mt: 2 }}
              >
                Risorse Utili
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ color: 'text.secondary', px: 2 }}
              >
                Accedi a una vasta gamma di risorse per arricchire la tua
                conoscenza culturale.
              </Typography>
              <StyledButton
                variant="outlined"
                component={Link}
                to="/resources"
                sx={{ mt: 2, px: 4 }}
              >
                Esplora Risorse
              </StyledButton>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Sezione degli Aggiornamenti Importanti */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Aggiornamenti Importanti
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: 'text.secondary', mb: 4 }}
          >
            Scopri le ultime novità e aggiornamenti importanti.
          </Typography>
          <StyledButton
            variant="outlined"
            onClick={handleOpenModal}
            sx={{ px: 4 }}
          >
            Leggi ora
          </StyledButton>
        </Box>
        <Testimonials />

        {/* Modale per Aggiornamenti Importanti */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialogContent-root': { p: 3 },
            '& .MuiDialogTitle-root': { p: 2 },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 700,
              textAlign: 'center',
              position: 'relative',
              py: 2,
            }}
          >
            Aggiornamenti Importanti
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: 'background.default',
              color: 'text.primary',
              textAlign: 'center',
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Nuove Funzionalità e Miglioramenti
            </Typography>
            <Typography variant="body1" paragraph>
              Siamo entusiasti di annunciare una serie di aggiornamenti che
              miglioreranno la tua esperienza su CulturalConnect. Abbiamo
              aggiunto nuove funzionalità per facilitare la tua connessione con
              la cultura locale e migliorato l'interfaccia utente per una
              navigazione più fluida.
            </Typography>
            <Typography variant="body2" paragraph>
              Ecco alcune delle principali novità:
            </Typography>
            <Typography variant="body2" paragraph>
              - **Nuove Sezioni di Eventi**: Scopri e partecipa a eventi
              culturali esclusivi con una nuova sezione dedicata agli eventi
              recenti.
            </Typography>
            <Typography variant="body2" paragraph>
              - **Miglioramenti nella Connessione**: Trova facilmente persone
              con interessi simili grazie a un sistema di connessione
              aggiornato.
            </Typography>
            <Typography variant="body2" paragraph>
              - **Espansione delle Risorse**: Accedi a una vasta gamma di
              risorse culturali e educative aggiornate.
            </Typography>
            <img
              src={Logo} 
              alt="Aggiornamenti"
              style={{ marginTop: 16, maxWidth: '25%', borderRadius: 8 }}
            />
          </DialogContent>
        </Dialog>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
