import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  styled,
  Drawer,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaHome,
  FaSearch,
  FaCalendarAlt,
  FaSignInAlt,
  FaUserPlus,
  FaUserFriends,
  FaFileAlt
} from 'react-icons/fa';
import Logo from '../styles/Logo.jpg';
import { motion } from 'framer-motion';
import MenuItems from '../components/MenuItems';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: '50px',
  borderRadius: '12px',
  boxShadow: theme.shadows[6],
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 600,
  textTransform: 'uppercase',
  borderRadius: '25px',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0, 1),
  transition: 'background-color 0.3s, color 0.3s',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.contrastText,
  },
  '&:active': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  background: 'linear-gradient(to right, #ff8a65, #ff6f61)',
  padding: theme.spacing(1, 2),
  boxShadow: theme.shadows[6],
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width:600px)': {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

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
    '& .MuiListItemIcon-root': {
      minWidth: '40px',
    },
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    width: 260,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    borderRight: 'none',
    padding: theme.spacing(2),
    overflow: 'auto',
  },
}));

const CustomAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated, logout } = useAuth();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMobileMenuClick = event => {
    setUserMenuAnchorEl(event.currentTarget);
    setUserMenuOpen(false);
  };

  const handleMobileMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleUserMenuClick = event => {
    setUserMenuAnchorEl(event.currentTarget);
    setUserMenuOpen(true);
  };

  const handleUserMenuClose = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

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
            alignItems: 'center',
            gap: 2,
          }}
        >
          <NavButton component={Link} to="/" startIcon={<FaHome />}>
            Home
          </NavButton>
          <NavButton component={Link} to="/explore" startIcon={<FaSearch />}>
            Explore
          </NavButton>
          <NavButton component={Link} to="/events" startIcon={<FaCalendarAlt />}>
            Events
          </NavButton>
          <NavButton component={Link} to="/connections" startIcon={<FaUserFriends />}>
            Connections
          </NavButton>
          <NavButton component={Link} to="/articles" startIcon={<FaFileAlt />}>
            Articles
          </NavButton>
          {isAuthenticated ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleUserMenuClick}
              aria-label="User settings menu"
              sx={{ ml: 2 }}
            >
              <FaUserCircle size={32} color={theme.palette.common.white} />
            </IconButton>
          ) : (
            <>
              <NavButton component={Link} to="/register" startIcon={<FaUserPlus />}>
                Register
              </NavButton>
              <NavButton component={Link} to="/login" startIcon={<FaSignInAlt />}>
                Login
              </NavButton>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            aria-label="Open mobile menu"
          >
            <MenuIcon />
          </IconButton>
          <StyledDrawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            variant="persistent"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'auto',
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -250 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MenuItems
                  isAuthenticated={isAuthenticated}
                  handleDrawerToggle={handleDrawerToggle}
                />
              </motion.div>
            </Box>
          </StyledDrawer>
          {isAuthenticated && (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleUserMenuClick}
                aria-label="User settings menu"
                sx={{ ml: 2 }}
              >
                <FaUserCircle size={32} color={theme.palette.common.white} />
              </IconButton>
              <StyledMenu
                anchorEl={userMenuAnchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
                PaperProps={{ sx: { mt: 1 } }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuItem
                    component={Link}
                    to="/settings"
                    onClick={handleUserMenuClose}
                  >
                    <FaCog style={{ marginRight: '8px' }} />
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <FaSignOutAlt style={{ marginRight: '8px' }} />
                    Logout
                  </MenuItem>
                </motion.div>
              </StyledMenu>
            </>
          )}
        </Box>
      </CustomToolbar>
    </AppBar>
  );
};

export default CustomAppBar;
