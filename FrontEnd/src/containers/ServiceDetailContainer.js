import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {useParams} from 'react-router-dom'
import serviceApi from '../config/serviceApi'
const {default: ServiceDetail} = require('../components/ServiceDetail')

//Retrieves data for detailed display of a single service
function ServiceDetailContainer() {
  const {id} = useParams()
  const [service, setService] = useState({})

  useEffect(() => {
    const callApi = async () => {
      try {
        const {data} = await Axios.get(serviceApi.getService(id))
        setService(data)
      } catch ({message}) {
        console.error('[ServiceDetailContainer]', message)
        alert(`Cannot get service with ID ${id}: ${message}`)
      }
    }
    callApi()
  }, [id])

  return <ServiceDetail service={service} />
}

export default ServiceDetailContainer
