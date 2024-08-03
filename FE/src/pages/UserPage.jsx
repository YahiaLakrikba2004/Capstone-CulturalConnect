import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserList from '../components/UserList'
import UserDetail from '../components/UserDetail'
import UserForm from '../components/Register'

const UserPage = () => (
  <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="/new" element={<UserForm />} />
    <Route path="/:id" element={<UserDetail />} />
    <Route path="/edit/:id" element={<UserForm />} />
  </Routes>
)

export default UserPage
