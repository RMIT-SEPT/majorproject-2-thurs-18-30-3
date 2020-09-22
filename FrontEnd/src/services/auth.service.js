import axios from 'axios'


const USER_STORAGE_KEY = 'user'
const API_BASE_URL = 'https://localhost:8080/api/users'

const register = (username, email, address, mobileNum, password, confirmPassword) => {
  const {data} = axios.post(API_BASE_URL, {
    username,
    email,
    address,
    mobileNum,
    password,
    confirmPassword,
    UserType: 'Customer',
  })

  if (data?.accessToken) {
    localStorage.setItem('user', JSON.stringify(data))
  }


  return data
}

const login = async (username, password) => {
  const {data} = await axios.post(API_BASE_URL, {
    username,
    password,
  })

  if (data?.accessToken) {
    localStorage.setItem('user', JSON.stringify(data))
  }

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
