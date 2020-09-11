import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import Employees from '../components/Employees'

function EmployeeListContainer() {
  const [employees, setEmployess] = useState([])

  useEffect(() => {
    async function callAPI() {
      try {
        const {data} = await Axios.get('https://5f50f63c5e98480016123379.mockapi.io/employees')
        setEmployess(data)
      } catch (err) {
        alert(err.message)
      }
    }
    callAPI()
  }, [])

  return <Employees employees={employees} />
}

export default EmployeeListContainer
