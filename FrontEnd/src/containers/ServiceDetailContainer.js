import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {useParams} from 'react-router-dom'
import ServiceApi from '../config/serviceApi'

import ServiceDetail from '../components/ServiceDetail'
import BookingApi from '../config/bookingApi'

//Retrieves data for detailed display of a single service
function ServiceDetailContainer() {
  const {id} = useParams()
  const [service, setService] = useState({})
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const callApis = async () => {
      try {
        const {data: serviceData} = await Axios.get(ServiceApi.getService(id))
        const {data: bookingData} = await Axios.get(BookingApi.getAllBookings)
        console.log('bookingData', bookingData)
        setService(serviceData)
        setBookings(bookingData)
      } catch ({message}) {
        console.error('[ServiceDetailContainer]', message)
        alert(message)
      }
    }
    callApis()
  }, [id])

  return <ServiceDetail availableBookings={bookings} service={service} />
}

export default ServiceDetailContainer
