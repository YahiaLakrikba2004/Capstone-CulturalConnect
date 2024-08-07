import React from 'react'
import { useAuth } from '../context/AuthContext' // Assicurati che il percorso sia corretto
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  styled,
} from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from 'framer-motion'
import { animated, useSpring } from '@react-spring/web'
import { FaUserCircle } from 'react-icons/fa'
import Logo from '../styles/Logo.jpg' // Assicurati che il percorso sia corretto

// Stile per il logo e il contenitore
const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

const LogoImage = styled('img')(({ theme }) => ({
  height: '50px',
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
}))

// Stile per i pulsanti
const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 600,
  textTransform: 'uppercase',
  borderRadius: '25px',
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0, 1),
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.contrastText,
  },
  '&:active': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

// Stile per la toolbar e la AppBar
const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  background: 'linear-gradient(to right, #ff8a65, #ff6f61)', // Gradiente per l'AppBar
  padding: theme.spacing(1, 2),
  boxShadow: theme.shadows[6],
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width:600px)': {
    flexDirection: 'row',
    alignItems: 'center',
  },
}))

// Stile per il Menu
const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[6],
    marginTop: theme.spacing(1),
  },
  '& .MuiMenuItem-root': {
    padding: theme.spacing(1, 2),
    fontWeight: 600,
    fontSize: '1rem',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

// Motion component for buttons
const MotionNavButton = motion(Button)

const CustomAppBar = () => {
  const theme = useTheme()
  const { isAuthenticated, logout } = useAuth() // Usa il contesto di autenticazione
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null)
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null)

  const handleMobileMenuClick = event => {
    setMobileMenuAnchorEl(event.currentTarget)
    setUserMenuAnchorEl(null) // Chiudi il menu utente se aperto
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null)
  }

  const handleUserMenuClick = event => {
    setUserMenuAnchorEl(event.currentTarget)
    setMobileMenuAnchorEl(null) // Chiudi il menu mobile se aperto
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null)
  }

  const handleLogout = () => {
    logout() // Usa la funzione di logout dal contesto
    window.location.href = '/login' // Redireziona verso la pagina di login
  }

  const menuItems = (
    <>
      <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
        Home
      </MenuItem>
      <MenuItem component={Link} to="/explore" onClick={handleMobileMenuClose}>
        Explore
      </MenuItem>
      <MenuItem component={Link} to="/events" onClick={handleMobileMenuClose}>
        Events
      </MenuItem>
      {!isAuthenticated && (
        <>
          <Divider />
          <MenuItem
            component={Link}
            to="/register"
            onClick={handleMobileMenuClose}
          >
            Register
          </MenuItem>
          <MenuItem
            component={Link}
            to="/login"
            onClick={handleMobileMenuClose}
          >
            Login
          </MenuItem>
        </>
      )}
      {isAuthenticated && (
        <>
          <Divider />
          <MenuItem
            component={Link}
            to="/settings"
            onClick={handleUserMenuClose}
          >
            Settings
          </MenuItem>
        </>
      )}
    </>
  )

  const menuSpring = useSpring({
    opacity: mobileMenuAnchorEl ? 1 : 0,
    transform: mobileMenuAnchorEl ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 250, friction: 20 },
  })

  return (
    <AppBar position="static">
      <CustomToolbar>
        <LogoContainer>
          <LogoImage src={Logo} alt="Logo" />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: theme.palette.common.white, fontWeight: 700 }}
          >
            CulturalConnect
          </Typography>
        </LogoContainer>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <MotionNavButton
            component={Link}
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ color: theme.palette.common.white }}
          >
            Home
          </MotionNavButton>
          <MotionNavButton
            component={Link}
            to="/explore"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ color: theme.palette.common.white }}
          >
            Explore
          </MotionNavButton>
          <MotionNavButton
            component={Link}
            to="/events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ color: theme.palette.common.white }}
          >
            Events
          </MotionNavButton>
          {!isAuthenticated && (
            <>
              <MotionNavButton
                component={Link}
                to="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ color: theme.palette.common.white }}
              >
                Register
              </MotionNavButton>
              <MotionNavButton
                component={Link}
                to="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ color: theme.palette.common.white }}
              >
                Login
              </MotionNavButton>
            </>
          )}
          {isAuthenticated && (
            <>
              <MotionNavButton
                component={Link}
                to="/settings"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ color: theme.palette.common.white }}
              >
                Settings
              </MotionNavButton>
              <MotionNavButton
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ color: theme.palette.common.white }}
              >
                Logout
              </MotionNavButton>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleUserMenuClick}
                sx={{ ml: 2 }}
              >
                <FaUserCircle size={32} color={theme.palette.common.white} />
              </IconButton>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMobileMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <StyledMenu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            sx={{ display: mobileMenuAnchorEl ? 'block' : 'none' }}
          >
            <animated.div style={menuSpring}>{menuItems}</animated.div>
          </StyledMenu>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleUserMenuClick}
            >
              <FaUserCircle size={32} color={theme.palette.common.white} />
            </IconButton>
          )}
        </Box>
        {isAuthenticated && (
          <StyledMenu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <MenuItem
              component={Link}
              to="/settings"
              onClick={handleUserMenuClose}
            >
              Settings
            </MenuItem>
          </StyledMenu>
        )}
      </CustomToolbar>
    </AppBar>
  )
}

export default CustomAppBar
