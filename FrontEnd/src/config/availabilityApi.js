const BASE_URL = 'http://localhost:8083/api/availabilities'

export default {
  sendMessage: BASE_URL,
  getAllAvailabilities: BASE_URL + '/all',
  getAvailability: (name) => `${BASE_URL}?username=${name}`,
}
