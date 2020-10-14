import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import BookingApi from '../config/bookingApi'
import CurrentUser from '../context/CurrentUser'

// Use Bootstrap table for easier unit testing
function EmployeeMyService() {
  const [currentUser] = useContext(CurrentUser)
  const [tableData, setTableData] = useState([])

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

  return (
    <div className="container" style={{marginTop: '3%'}}>
      <div className="row" style={{marginBottom: '2%'}}>
        <div className="col">
          <input type="text" className="form-control" placeholder="message admin..." />
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
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
