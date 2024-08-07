import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null) // Stato dell'utente
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true)
      setUser(decodeJwt(token)) // Decodifica il token per ottenere i dettagli dell'utente
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [])

  const decodeJwt = token => {
    try {
      const payload = token.split('.')[1] // Ottieni il payload
      const decoded = atob(payload) // Decodifica il payload base64
      return JSON.parse(decoded) // Parsea il payload JSON
    } catch (e) {
      return null // Token non valido o non decodificabile
    }
  }

  const isTokenExpired = token => {
    try {
      const decoded = decodeJwt(token)
      if (decoded && decoded.exp) {
        const now = Date.now() / 1000
        return decoded.exp < now
      }
      return true // Token non valido o non decodificabile
    } catch (e) {
      return true // Token non valido o non decodificabile
    }
  }

  const login = token => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    setUser(decodeJwt(token)) // Decodifica il token per ottenere i dettagli dell'utente
    navigate('/home')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null) // Rimuovi i dettagli dell'utente
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
