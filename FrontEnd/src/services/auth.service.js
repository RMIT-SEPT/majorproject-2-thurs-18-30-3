import axios from 'axios'
import UserType from '../config/userType'

const USER_STORAGE_KEY = 'user'
const API_BASE_URL = 'http://localhost:8081/api/users'

//POST a new user data with type customer
const register = async (payload, forEmployee) => {
  const {data} = await axios.post(API_BASE_URL, {
    ...payload,
    userType: forEmployee ? UserType.Employee : UserType.Customer,
  })

  if (!forEmployee) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))

  return data
}
//GET user data from this API
//Compared retrieved password with user input password
const login = async (inputUsername, inputPassword) => {
  const {data} = await axios.get(API_BASE_URL + '/' + inputUsername)
  console.log('login response data', data)

  const {password} = data
  if (inputPassword !== password) throw new Error('Username or password is incorrect.')

  const item = {
    ...data,
    userType: data.userType.toLowerCase(),
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(item))

  return item
}
//Remove local storage user data
const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY)
}
//Get current user data from local storage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(USER_STORAGE_KEY))
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
}
