
import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        py: 4,
        textAlign: 'center',
        bgcolor: 'primary.main',
        color: '#ffffff',
        mt: 8,
        borderTop: '1px solid #ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Social Media Links */}
      <Box sx={{ mb: 2 }}>
        <IconButton
          component={Link}
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <Facebook />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <Twitter />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <Instagram />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <LinkedIn />
        </IconButton>
      </Box>

      {/* Footer Content */}
      <Typography variant="body2" sx={{ mb: 2 }}>
        © {new Date().getFullYear()} CulturalConnect. Tutti i diritti riservati.
      </Typography>
      <Typography variant="body2">
        <Link
          href="/terms"
          style={{
            textDecoration: 'none',
            color: '#ffffff',
            marginRight: 8,
            fontWeight: 500,
          }}
        >
          Termini e Condizioni
        </Link>
        |
        <Link
          href="/privacy"
          style={{
            textDecoration: 'none',
            color: '#ffffff',
            marginLeft: 8,
            fontWeight: 500,
          }}
        >
          Privacy Policy
        </Link>
      </Typography>

      {/* Contact Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Contattaci:
        </Typography>
        <Typography variant="body2">
          <Link href="mailto:info@culturalconnect.com" style={{ color: '#ffffff', textDecoration: 'none' }}>
            info@culturalconnect.com
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
