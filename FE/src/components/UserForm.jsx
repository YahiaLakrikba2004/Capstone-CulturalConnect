import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography, Box } from '@mui/material'

const UserForm = ({ mode, onUserChange }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetchUser()
    }
  }, [id, mode])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      if (mode === 'edit') {
        await axios.put(`http://localhost:8080/api/users/${id}`, user)
      } else {
        await axios.post('http://localhost:8080/api/users/register', user)
      }
      if (onUserChange) {
        onUserChange() // Refresh user list if a callback is provided
      }
      navigate('/users')
    } catch (error) {
      console.error(
        `Error ${mode === 'edit' ? 'updating' : 'creating'} user:`,
        error
      )
    }
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {mode === 'edit' ? 'Edit User' : 'Create User'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Role"
          name="role"
          value={user.role}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
        >
          {mode === 'edit' ? 'Update User' : 'Create User'}
        </Button>
      </Box>
    </Container>
  )
}

export default UserForm
