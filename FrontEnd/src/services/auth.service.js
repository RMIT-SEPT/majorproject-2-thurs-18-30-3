import axios from 'axios'

const USER_STORAGE_KEY = 'user'
const API_BASE_URL = 'https://localhost:8080/'

const register = (username, email, password) => {
  // const {data} = axios.post(API_BASE_URL + '/api/users/login', {
  //   username,
  //   email,
  //   password,
  // })

  const data = {
    email: 'Max deWinter',
    name: 'MaxWinter@Cust.wiz',
    phone: '1234 5678',
    address: '1 Manderly Way',
    id: 1,
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))

  return data
}

const login = async (username, password) => {
  // const {data} = await axios.post(API_BASE_URL + '/api/users/login', {
  //   username,
  //   password,
  // })
  const data = {
    id: 1,
    email: 'Max deWinter',
    name: 'MaxWinter@Cust.wiz',
    userType: 'customer',
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))

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
