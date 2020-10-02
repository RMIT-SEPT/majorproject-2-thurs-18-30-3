// const BASE_URL = http://localhost:8080/api/
const BASE_URL = 'https://5f51c3975e98480016123e31.mockapi.io/services'

export default {
  getAllServices: BASE_URL,
  getService: (id) => `${BASE_URL}/${id}`,
}
