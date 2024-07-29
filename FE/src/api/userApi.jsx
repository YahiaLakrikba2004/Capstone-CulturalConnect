// src/api/userApi.js
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/users'

export const getAllUsers = () => axios.get(API_URL)
export const getUserById = id => axios.get(`${API_URL}/${id}`)
export const createUser = user => axios.post(`${API_URL}/register`, user)
export const deleteUser = id => axios.delete(`${API_URL}/${id}`)
