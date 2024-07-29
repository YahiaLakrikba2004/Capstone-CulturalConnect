import React, { useEffect, useState } from 'react'
import { getUserById } from '../api/userApi'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [id])

  const fetchUser = async () => {
    try {
      const response = await getUserById(id)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

export default UserDetail
