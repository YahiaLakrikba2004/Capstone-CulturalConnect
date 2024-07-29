// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Events from './pages/Eventi'
import Connections from './pages/Connections'
import Resources from './pages/Resources'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Explore from './pages/Explore'

import EventDetail from './components/EventDetail'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import CustomAppBar from './components/AppBar'

const App = () => {
  return (
    <Router>
      <CustomAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/edit-user/:id" element={<UserForm mode="edit" />} />
        <Route path="/create-user" element={<UserForm mode="create" />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  )
}

export default App
