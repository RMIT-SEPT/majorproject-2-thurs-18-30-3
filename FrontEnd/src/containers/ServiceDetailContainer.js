import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {useParams} from 'react-router-dom'
import ServiceApi from '../config/serviceApi'

import ServiceDetail from '../components/ServiceDetail'
import UserApi from '../config/userApi'
import UserType from '../config/userType'

//Retrieves data for detailed display of a single service
function ServiceDetailContainer() {
  const {id} = useParams()
  const [service, setService] = useState({})
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const callApis = async () => {
      try {
        const {data: serviceData} = await Axios.get(ServiceApi.getService(id))
        setService(serviceData)

        const {data: users} = await Axios.get(UserApi.getAllUsers)

        setEmployees(users.filter((user) => user.userType === UserType.Employee))
      } catch ({message}) {
        console.error('[ServiceDetailContainer]', message)
        alert(message)
      }
    }
    callApis()
  }, [id])

  const handleBookClick = (selectedEmployee) => {
    console.log('Book clicked! selectedEmployee =', selectedEmployee)
  }

  return <ServiceDetail service={service} employees={employees} onSubmit={handleBookClick} />
}

export default ServiceDetailContainer
