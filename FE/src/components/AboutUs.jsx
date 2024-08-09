import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import HistoryIcon from '@mui/icons-material/History';
import MissionIcon from '@mui/icons-material/Flag';
import FutureIcon from '@mui/icons-material/Star';

// Hero Section Background Image
const heroBackground = 'https://info.ehl.edu/hubfs/Cultural-Diversity-Accomodation.jpg';

const AboutUs = () => {
  return (
    <div>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            height: { xs: '300px', sm: '400px', md: '500px' },
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            marginTop: '1rem',
            boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: { xs: 3, sm: 4, md: 5 },
              borderRadius: '12px',
              maxWidth: '80%',
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
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
            >
              Chi Siamo
            </Typography>
            <Typography
              variant="h6"
              paragraph
              sx={{
                maxWidth: '80%',
                margin: '0 auto',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.75rem' },
                color: '#ffffff',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
              }}
            >
              Scopri di più su di noi e sulla nostra missione per promuovere la connessione culturale.
            </Typography>
          </Box>
        </Box>

        {/* Informative Sections */}
        <Box sx={{ my: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    padding: 4,
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    La Nostra Storia
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <HistoryIcon sx={{ color: '#1976d2' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Fondata nel 2024"
                        secondary="CulturalConnect è emersa come una risposta alle crescenti esigenze di connessione culturale, unendo persone attraverso eventi e contenuti culturali globali."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    padding: 4,
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    La Nostra Missione
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <MissionIcon sx={{ color: '#388e3c' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Rendere la cultura accessibile"
                        secondary="Offriamo eventi, articoli e risorse educative per creare opportunità di connessione autentica e promuovere una comprensione interculturale."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    padding: 4,
                    borderRadius: '12px',
                    
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Il Nostro Futuro
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FutureIcon sx={{ color: '#0288d1' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Progetti Innovativi"
                        secondary="Esplora i progetti innovativi che stiamo sviluppando e le nostre iniziative rivoluzionarie per migliorare la sostenibilità, l'efficienza e l'accessibilità."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Vuoi saperne di più o collaborare con noi?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
            Per ulteriori informazioni o per collaborare con noi, non esitare a
            contattarci utilizzando le informazioni sottostanti.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton
                component="a"
                href="mailto:info@culturalconnect.org"
                sx={{ color: 'text.primary' }}
              >
                <MailOutlineIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="tel:+393517195154"
                sx={{ color: 'text.primary' }}
              >
                <PhoneIcon fontSize="large" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Segui i nostri aggiornamenti su{' '}
              <Link to="/social-media">social media</Link>.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default AboutUs;
