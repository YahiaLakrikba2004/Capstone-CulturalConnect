import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const UserUpdateForm = () => {
  const { id } = useParams()
  const history = useHistory()
  const [user, setUser] = useState({ username: '', password: '' })

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error))
  }, [id])

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios
      .put(`/api/users/${id}`, user)
      .then(() => history.push('/users'))
      .catch(error => console.error('Error updating user:', error))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update User</button>
    </form>
  )
}

export default UserUpdateForm
