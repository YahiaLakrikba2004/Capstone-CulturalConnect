import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importazione delle pagine
import Home from './pages/Home';
import Explore from './pages/Explore';
import Events from './pages/Eventi'; 
import EventDetail from './components/EventDetail';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Articles from './pages/Articles';
import Settings from './pages/Settings';
import UserList from './components/UserList';
import Register from './pages/Register';
import Connections from './pages/Connections';
import Resources from './pages/Resources';
import ForgotPassword from './components/ForgotPassword'; // Importa il componente ForgotPassword
import CustomAppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute'; // Assicurati che questo componente esista e funzioni correttamente
import AboutUs from './components/AboutUs'; // Importa il componente AboutUs

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CustomAppBar />
        <Routes>
          {/* Rotte pubbliche */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/register" element={<Register mode="register" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Aggiungi la rotta per AboutUs */}

          {/* Rotte protette */}
          <Route element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/edit-user/:id" element={<Register mode="edit" />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/resources" element={<Resources />} />
          </Route>

          {/* Redirect per assicurare che una pagina predefinita sia visibile */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
