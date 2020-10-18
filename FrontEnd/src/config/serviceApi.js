const BASE_URL = 'http://localhost:8080/api/services'
//const BASE_URL = 'https://5f51c3975e98480016123e31.mockapi.io/services'

export default {
  getUrl: BASE_URL,
  getAllServices: BASE_URL + '/all',
  getService: (id) => `${BASE_URL}/${id}`,
}
