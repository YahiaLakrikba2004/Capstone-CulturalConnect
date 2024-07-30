// src/components/AppLayout.jsx
import React from 'react'
import {
  Box,
  CssBaseline,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const AppLayout = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CulturalConnect
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/explore">
            Explore
          </Button>
          <Button color="inherit" component={Link} to="/connections">
            Connections
          </Button>
          <Button color="inherit" component={Link} to="/resources">
            Resources
          </Button>
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/home" onClick={handleMenuClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/explore" onClick={handleMenuClose}>
              Explore
            </MenuItem>
            <MenuItem
              component={Link}
              to="/connections"
              onClick={handleMenuClose}
            >
              Connections
            </MenuItem>
            <MenuItem
              component={Link}
              to="/resources"
              onClick={handleMenuClose}
            >
              Resources
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Ensure this margin-top is equal to the AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AppLayout
