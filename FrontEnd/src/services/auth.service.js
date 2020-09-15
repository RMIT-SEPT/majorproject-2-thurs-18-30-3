import axios from 'axios'

// const API_URL = 'http://rmit:8080/api/auth/'

const USER_STORAGE_KEY = 'user'

const register = async (username, password, email, address, mobile) => {
  const {data} = await axios.post('https://5f50f63c5e98480016123379.mockapi.io/account', {
    username,
    password,
    email,
    address,
    mobile,
    userType: 'customer',
  })

  // const data = {
  //   username,
  // }
  // localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))

  return data
}

const login = async (username, password) => {
  // const {data} = await axios.post(API_URL + 'signin', {
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
