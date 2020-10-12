import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {useParams} from 'react-router-dom'
import ServiceApi from '../config/serviceApi'

import ServiceDetail from '../components/ServiceDetail'
import UserApi from '../config/userApi'
import UserType from '../config/userType'
import BookingApi from '../config/bookingApi'

//Retrieves data for detailed display of a single service
function ServiceDetailContainer() {
  const {id} = useParams()
  const [service, setService] = useState({})
  const [bookings, setBookings] = useState([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const callApis = async () => {
      try {
        const {data: serviceData} = await Axios.get(ServiceApi.getService(id))
        const {data: bookingData} = await Axios.get(BookingApi.getAllBookings)
        setService(serviceData)
        console.log('bookingData', bookingData)
        setBookings(bookingData)

        const {data: users} = await Axios.get(UserApi.getAllUsers)

        setEmployees(users.filter((user) => user.userType === UserType.Employee))
      } catch ({message}) {
        console.error('[ServiceDetailContainer]', message)
        alert(message)
      }
    }
    callApis()
  }, [id])

  return <ServiceDetail availableBookings={bookings} service={service} employees={employees} />
}

export default ServiceDetailContainer
