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
      setUser(decodeJwt(token)) 
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [])

  const decodeJwt = token => {
    try {
      const payload = token.split('.')[1] 
      const decoded = atob(payload) 
      return JSON.parse(decoded) 
    } catch (e) {
      return null 
    }
  }

  const isTokenExpired = token => {
    try {
      const decoded = decodeJwt(token)
      if (decoded && decoded.exp) {
        const now = Date.now() / 1000
        return decoded.exp < now
      }
      return true 
    } catch (e) {
      return true 
    }
  }

  const login = token => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
    setUser(decodeJwt(token)) 
    navigate('/home')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null) 
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
