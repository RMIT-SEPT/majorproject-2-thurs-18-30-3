const BASE_URL = 'http://localhost:8081/api/users'

export default {
  getUrl : BASE_URL,
  getAllUsers: BASE_URL +'/all',
  getUser: (id) => `${BASE_URL}/${id}`,
}
