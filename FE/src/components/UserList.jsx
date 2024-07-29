import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null) 
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const username = 'user'
      const password = 'password' 
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
          Authorization: 'Basic ' + btoa(`${username}:${password}`),
        },
      })

      if (Array.isArray(response.data)) {
        setUsers(response.data)
      } else {
        console.error('Response is not an array')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`)
      fetchUsers()
    } catch (error) {
      setError('Error deleting user')
      console.error('Error deleting user:', error)
    }
  }

  const handleEdit = id => {
    navigate(`/edit-user/${id}`)
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        User List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}{' '}
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map(user => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(user.id)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default UserList
