import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import BookingApi from '../config/bookingApi'
import CurrentUser from '../context/CurrentUser'
import AvailabilityApi from '../config/availabilityApi'

// Use Bootstrap table for easier unit testing
function EmployeeMyService() {
  const [currentUser] = useContext(CurrentUser)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getTableData = async () => {
      try {
        const {data} = await Axios.get(BookingApi.getAllBookings)

        const filtered = data.filter((d) => d.employeeId === currentUser.id)
        setTableData(filtered)

      } catch ({message}) {
        alert(message)
      }
    }
    getTableData()
  }, [currentUser.id])

  const onSendMsgAdmin = async () => {
    try {
      const username = currentUser.username
      if (!username) alert('Username not exist')

      const payload = {
        username,
        availability: message,
      }
      const {data} = await Axios.post(AvailabilityApi.sendMessage, payload)
      console.log('AvailabilityApi response', data)
      alert('Your message has been sent to admin!')
    } catch ({message, response}) {
      console.error('Error response', response.data ?? message)
      alert(message)
    }
  }

  const onInputChange = ({target}) => {
    setMessage(target.value)
  }

  return (
    <div className="container" style={{marginTop: '3%'}}>
      <div className="row" style={{marginBottom: '2%'}}>
        <div className="col">
          <input type="text" onChange={onInputChange} className="form-control" placeholder="message admin..." />
        </div>
        <div className="col">
          <button onClick={onSendMsgAdmin} type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Start Time</th>
            <th scope="col">Date</th>
            <th scope="col">Service Name</th>
            <th scope="col">Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({time, date, serviceName, customerId}) => (
            <tr>
              <th scope="row">{time}</th>
              <td>{date}</td>
              <td>{serviceName}</td>
              <td>{customerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeMyService
