import axios from 'axios'
import UserType from '../config/userType'


const USER_STORAGE_KEY = 'user'
const API_BASE_URL = 'http://localhost:8080/api/users'

const register = async (payload) => {
  const {data} = await axios.post(API_BASE_URL, {
    ...payload,
    type: UserType.Customer,
  })

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))

  return data
}

const login = async (inputUsername, inputPassword) => {
  const {data} = await axios.get(API_BASE_URL + '/' + inputUsername)
  console.log('login response data', data)

  const {password} = data
  if (inputPassword !== password) throw new Error('Username or password is incorrect.')

  const item = {
    ...data,
    type: data.type.toLowerCase(),
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(item))

  return data
}

const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY)
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(USER_STORAGE_KEY))
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
}
