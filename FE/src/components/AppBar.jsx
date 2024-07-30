import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../styles/Logo.jpg' // Assicurati che il percorso dell'immagine sia corretto
import MenuIcon from '@mui/icons-material/Menu' // Aggiunta icona menu per la versione mobile

const CustomAppBar = () => {
  const theme = useTheme()

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.primary.main, // Colore di sfondo dal tema principale
        color: '#ffffff', // Colore del testo bianco per contrasto
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)', // Ombra moderata per un effetto di profondità migliorato
        padding: '0 32px', // Spaziatura interna ottimizzata per un aspetto più elegante
        borderBottom: '2px solid #4a3c31', // Bordo inferiore più definito
        zIndex: theme => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 64,
          flexWrap: 'wrap',
        }}
      >
        {/* Logo e Nome */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={Logo}
              alt="CulturalConnect Logo"
              style={{
                height: 50,
                width: 50,
                borderRadius: '50%',
                marginRight: 16,
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
                },
              }}
            />
            <Typography
              variant="h6"
              sx={{ color: '#ffffff', fontWeight: 700, letterSpacing: 1 }}
            >
              CulturalConnect
            </Typography>
          </Link>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              padding: '10px 24px',
              borderRadius: 25,
              border: '2px solid transparent',
              backgroundColor: 'transparent',
              transition:
                'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
              '&:hover': {
                color: '#ffffff',
                backgroundColor: '#4a3c31',
                border: '2px solid #4a3c31',
              },
            }}
          >
            Users
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/create-user"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              padding: '10px 24px',
              borderRadius: 25,
              border: '2px solid transparent',
              backgroundColor: 'transparent',
              transition:
                'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
              '&:hover': {
                color: '#ffffff',
                backgroundColor: '#4a3c31',
                border: '2px solid #4a3c31',
              },
            }}
          >
            Create User
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{
            display: { xs: 'block', sm: 'none' },
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar
