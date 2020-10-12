const BASE_URL = 'http://localhost:8082/api/bookings'
//const BASE_URL = 'https://5f51c3975e98480016123e31.mockapi.io/bookings'

export default {
  getUrl: BASE_URL,
  getAllBookings: BASE_URL + '/all',
  getBooking: (id) => `${BASE_URL}/${id}`,
}
