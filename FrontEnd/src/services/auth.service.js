import axios from 'axios'

const API_URL = 'http://rmit:8080/api/auth/'

const register = (username, email, password) => {
  // const {data} = axios.post(API_URL + 'signup', {
  //   username,
  //   email,
  //   password,
  // })

  const data = {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  }

  if (data?.accessToken) {
    localStorage.setItem('user', JSON.stringify(data))
  }

  return data
}

const login = async (username, password) => {
  const {data} = await axios.post(API_URL + 'signin', {
    username,
    password,
  })
  /* const data = {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  }*/

  if (data?.accessToken) {
    localStorage.setItem('user', JSON.stringify(data))
  }

  return data
}

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('data'))
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
}
