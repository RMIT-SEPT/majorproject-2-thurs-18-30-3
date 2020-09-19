import axios from 'axios'

const USER_STORAGE_KEY = 'user'
const API_BASE_URL = 'http://localhost:8080/api/users'

const register = (username, email, address, mobileNum, password, confirmPassword) => {
  const {data} = axios.post(API_BASE_URL, {
    username,
    email,
    address,
    mobileNum,
    password,
    confirmPassword,
    type: 'Customer',
  })

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))

  return data
}

const login = async (inputUsername, inputPassword) => {
  const {data} = await axios.get(API_BASE_URL + '/' + inputUsername)
  console.log('login response data', data)

  const {password} = data
  if (inputPassword !== password) throw new Error('Username or password is incorrect.')

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
