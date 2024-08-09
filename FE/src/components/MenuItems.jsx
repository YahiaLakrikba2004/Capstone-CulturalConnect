import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  styled,
  useTheme,
  Typography,
  Badge,
} from '@mui/material'
import {
  FaHome,
  FaSearch,
  FaCalendarAlt,
  FaCog,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa'
import { useSpring, animated } from 'react-spring'

const DrawerMenuItem = styled(ListItem)(({ theme, active }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
  backgroundColor: active ? theme.palette.action.selected : 'inherit',
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
    transform: 'scale(1.05)', 
  },
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    color: 'inherit',
    transition: 'color 0.3s ease',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 600,
  },
}))

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.divider,
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1, 2),
  fontWeight: 700,
  fontSize: '1.2rem',
  color: theme.palette.text.secondary,
}))

const AnimatedIcon = ({ icon: Icon, ...props }) => {
  const [propsSpring, set] = useSpring(() => ({
    transform: 'scale(1)',
    config: { tension: 200, friction: 12 },
  }))

  return (
    <animated.div
      style={propsSpring}
      onMouseEnter={() => set({ transform: 'scale(1.15)' })}
      onMouseLeave={() => set({ transform: 'scale(1)' })}
    >
      <Icon {...props} />
    </animated.div>
  )
}

const MenuItems = ({ isAuthenticated, handleDrawerToggle }) => {
  const theme = useTheme()
  const location = useLocation()
  const currentPath = location.pathname

  // Funzione per determinare se l'elemento di menu è attivo
  const isActive = (path) => currentPath === path

  return (
    <List>
      <DrawerMenuItem
        component={Link}
        to="/"
        onClick={handleDrawerToggle}
        active={isActive('/')}
      >
        <ListItemIcon>
          <AnimatedIcon icon={FaHome} size={22} color={theme.palette.text.primary} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </DrawerMenuItem>
      <DrawerMenuItem
        component={Link}
        to="/connections"
        onClick={handleDrawerToggle}
        active={isActive('/connections')}
      >
        <ListItemIcon>
          <AnimatedIcon icon={FaSearch} size={22} color={theme.palette.text.primary} />
        </ListItemIcon>
        <ListItemText primary="Connesioni" />
      </DrawerMenuItem>
      <DrawerMenuItem
        component={Link}
        to="/events"
        onClick={handleDrawerToggle}
        active={isActive('/events')}
      >
        <ListItemIcon>
          <AnimatedIcon icon={FaCalendarAlt} size={22} color={theme.palette.text.primary} />
        </ListItemIcon>
        <ListItemText primary="Eventi" />
      </DrawerMenuItem>

      {!isAuthenticated && (
        <>
          <StyledDivider />
          <SectionTitle variant="body2">Guest Options</SectionTitle>
          <DrawerMenuItem
            component={Link}
            to="/register"
            onClick={handleDrawerToggle}
            active={isActive('/register')}
          >
            <ListItemIcon>
              <Badge color="secondary" variant="dot">
                <AnimatedIcon icon={FaSignInAlt} size={22} color={theme.palette.text.primary} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Registrati" />
          </DrawerMenuItem>
          <DrawerMenuItem
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
            active={isActive('/login')}
          >
            <ListItemIcon>
              <Badge color="secondary" variant="dot">
                <AnimatedIcon icon={FaSignInAlt} size={22} color={theme.palette.text.primary} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Login" />
          </DrawerMenuItem>
        </>
      )}

      {isAuthenticated && (
        <>
          <StyledDivider />
          <SectionTitle variant="body2">User Optionsì</SectionTitle>
          <DrawerMenuItem
            component={Link}
            to="/settings"
            onClick={handleDrawerToggle}
            active={isActive('/settings')}
          >
            <ListItemIcon>
              <AnimatedIcon icon={FaCog} size={22} color={theme.palette.text.primary} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </DrawerMenuItem>
          <DrawerMenuItem
            component={Link}
            to="/logout"
            onClick={handleDrawerToggle}
            active={isActive('/logout')}
          >
            <ListItemIcon>
              <AnimatedIcon icon={FaSignOutAlt} size={22} color={theme.palette.text.primary} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </DrawerMenuItem>
        </>
      )}
    </List>
  )
}

export default MenuItems
