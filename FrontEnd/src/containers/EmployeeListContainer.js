import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import Employees from '../components/Employees'
import UserType from '../config/userType'

const API_URL = 'http://localhost:8081/api/users'

function EmployeeListContainer() {
  const [employees, setEmployees] = useState([])
  const [alertMsg, setAlertMsg] = useState('')
  const [alertErrorMsg, setAlertErrorMsg] = useState('')
  //Retrieves and display employees list
  useEffect(() => {
    async function callAPI() {
      try {
        const {data} = await Axios.get(API_URL)
        setEmployees(data.filter((d) => d.userType === UserType.Employee))
      } catch (err) {
        setAlertErrorMsg(err.message)
      }
    }
    callAPI()
  }, [])

  function onAlertClose() {
    setAlertMsg('')
    setAlertErrorMsg('')
  }
  //PUT request to edit employee data to the backend
  async function onRowUpdate(newData, oldData) {
    try {
      await Axios.put(`${API_URL}/${newData.username}`, newData)
    } catch ({messsage}) {
      setAlertErrorMsg(messsage)
    }

    setTimeout(() => {
      const data = [...employees]
      data[data.indexOf(oldData)] = newData
      setEmployees(data)
    }, 600)
  }
  //DELETE specific employee data from the backend
  async function onRowDelete(oldData) {
    try {
      await Axios.delete(`${API_URL}/${oldData.id}`)
      const data = [...employees]
      data.splice(data.indexOf(oldData), 1)
      setEmployees(data)
    } catch ({messsage}) {
      setAlertErrorMsg(messsage)
    }
  }

  return (
    <Employees
      employees={employees}
      onRowUpdate={onRowUpdate}
      onRowDelete={onRowDelete}
      alertMsg={alertMsg}
      alertErrorMsg={alertErrorMsg}
      onAlertClose={onAlertClose}
    />
  )
}

export default EmployeeListContainer
