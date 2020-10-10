const BASE_URL = 'http://localhost:8081/api/users'

export default {
  getAllUsers: BASE_URL,
  getUser: (id) => `${BASE_URL}/${id}`,
}
