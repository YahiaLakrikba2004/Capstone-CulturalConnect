import React, { useState } from 'react';
import {
  Container, Typography, Grid, Box, Dialog, DialogTitle, DialogContent, IconButton, TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledCard, StyledButton } from '../components/StyledComponents';
import { Event, People, LibraryBooks, Article, Close } from '@mui/icons-material';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonial'; // Verifica il percorso e il nome

import Logo from '../styles/Logo.jpg';
import { motion } from 'framer-motion';

// Hero Section Background Image
const heroBackground = 'https://info.ehl.edu/hubfs/Cultural-Diversity-Accomodation.jpg';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Gestione Modale
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Gestione FAQ
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Dati FAQ
  const faqData = [
    {
      question: "Come posso connettermi con altre persone?",
      answer: "Utilizza la nostra funzione di ricerca avanzata per trovare persone con interessi simili e invia loro una richiesta di connessione."
    },
    {
      question: "Dove posso trovare gli eventi locali?",
      answer: "Visita la nostra sezione 'Eventi' per scoprire gli eventi culturali e sociali in programma nella tua area."
    },
    {
      question: "Come posso contattare il supporto?",
      answer: "Puoi contattare il nostro supporto tramite il modulo di contatto nella sezione 'Contattaci' o inviarci un'email direttamente."
    }
  ];

  return (
    <div>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            background: `url(${heroBackground}) no-repeat center center/cover`,
            height: { xs: '300px', sm: '400px', md: '500px' }, // Altezza reattiva
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            position: 'relative',
            marginTop: '1rem',
            boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: { xs: 2, sm: 3, md: 4 }, // Padding reattivo
              borderRadius: '12px',
              maxWidth: '90%',
              textAlign: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
            >
              Benvenuti su CulturalConnect
            </Typography>
            <Typography
              variant="h6"
              paragraph
              sx={{
                maxWidth: '90%',
                margin: '0 auto',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.5rem' },
                color: '#ffffff',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
              }}
            >
              La tua piattaforma ideale per connetterti con eventi e culture locali.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              component={Link}
              to="/explore"
              sx={{ mt: 3, fontSize: { xs: '0.875rem', sm: '1rem' }, px: 4 }}
            >
              Esplora Ora
            </StyledButton>
          </Box>
        </Box>

        {/* Chi Siamo */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Chi Siamo
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'text.secondary', maxWidth: '800px', margin: '0 auto' }}>
            Siamo CulturalConnect, la tua finestra sul mondo culturale. Offriamo una piattaforma unica per scoprire e interagire con eventi e contenuti culturali locali e globali. La nostra missione è creare connessioni significative e arricchire la tua esperienza culturale.
          </Typography>
        </Box>

        {/* Grid Section */}
        <Grid container spacing={5} sx={{ mt: 4 }}>
          {[
            {
              icon: <Event sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'primary.main' }} />,
              title: 'Eventi Recenti',
              description: 'Resta aggiornato sugli eventi culturali e sociali più recenti nella tua area.',
              link: '/events'
            },
            {
              icon: <People sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'primary.main' }} />,
              title: 'Nuove Connessioni',
              description: 'Trova e connettiti con persone che condividono i tuoi interessi e passioni.',
              link: '/connections'
            },
            {
              icon: <Article sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'primary.main' }} />,
              title: 'Articoli Recenti',
              description: 'Leggi articoli informativi e stimolanti sul mondo della cultura e degli eventi.',
              link: '/articles'
            },
            {
              icon: <LibraryBooks sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: 'primary.main' }} />,
              title: 'Risorse Utili',
              description: 'Accedi a risorse preziose e materiali educativi per approfondire le tue conoscenze culturali.',
              link: '/resources'
            }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <StyledCard
                  elevation={12}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '12px',
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
                    justifyContent: 'space-between',
                    height: '100%', // Altezza uniforme
                    minHeight: '300px', // Altezza minima uniforme
                  }}
                >
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {item.icon}
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 2 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ color: 'text.secondary', px: 2 }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <StyledButton
                    variant="outlined"
                    component={Link}
                    to={item.link}
                    sx={{ mt: 2, px: 4 }}
                  >
                    Scopri
                  </StyledButton>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Sezione Domande Frequenti (FAQ) */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Domande Frequenti
          </Typography>
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqData.map((faq, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ cursor: 'pointer', fontWeight: 700 }}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </Typography>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: expandedFAQ === index ? 1 : 0, height: expandedFAQ === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {faq.answer}
                  </Typography>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Modale di Contatto */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>
            Contattaci
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                type="text"
                fullWidth
                variant="standard"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                id="message"
                label="Messaggio"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="standard"
                required
              />
            </form>
          </DialogContent>
        </Dialog>
      </Container>
      <Testimonials /> {/* Corretto uso del componente Testimonials */}
      <Footer />
    </div>
  );
};

export default Home;
