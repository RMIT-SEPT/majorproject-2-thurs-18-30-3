import axios from 'axios'

const API_URL = 'http://localhost:8080/api/users'
const USER_STORAGE_KEY = 'user'

const register = (username, password, email, mobileNum) => {
  const {data} = axios.post(API_URL, {
    username,
    password,
    email,
    mobileNum,
  })

  // const data = {
  //   username,
  // }
  // localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))
  console.log("data", data)
  return data
}

const login = async (username, password) => {
  // const {data} = await axios.post(API_URL, {
  //   username,
  //   password,
  // })

  const data = {
    username,
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))

  return data
}

const logout = () => {
  localStorage.removeItem('user')
}

const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem(USER_STORAGE_KEY))
}

export default {
  register,
  login,
  logout,
  getCurrentUser: getUserFromStorage,
}
