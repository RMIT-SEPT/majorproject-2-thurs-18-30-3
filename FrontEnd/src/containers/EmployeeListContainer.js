import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import Employees from '../components/Employees'

function EmployeeListContainer() {
  const [employees, setEmployees] = useState([])
  const [alertMsg, setAlertMsg] = useState('')
  const [alertErrorMsg, setAlertErrorMsg] = useState('')
  //Retrieves and display employees list
  useEffect(() => {
    async function callAPI() {
      try {
        const {data} = await Axios.get('https://5f50f63c5e98480016123379.mockapi.io/employees')
        setEmployees(data)
      } catch (err) {
        alert(err.message)
      }
    }
    callAPI()
  }, [])

  function onAlertClose() {
    setAlertMsg('')
    setAlertErrorMsg('')
  }
  //POST request to add new employee data to the backend
  async function onRowAdd(newData) {
    // TODO: call real api
    try {
      await Axios.post('https://5f50f63c5e98480016123379.mockapi.io/employees', newData)
      setEmployees([...employees, newData])
      setAlertMsg(`${newData.name} has been added`)
    } catch ({messsage}) {
      setAlertErrorMsg(messsage)
    }
  }
  //PUT request to edit employee data to the backend
  async function onRowUpdate(newData, oldData) {
    try {
      await Axios.put(`https://5f50f63c5e98480016123379.mockapi.io/employees/${oldData.id}`, newData)
      setEmployees([...employees, newData])
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
      await Axios.delete(`https://5f50f63c5e98480016123379.mockapi.io/employees/${oldData.id}`)
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
      onRowAdd={onRowAdd}
      onRowUpdate={onRowUpdate}
      onRowDelete={onRowDelete}
      alertMsg={alertMsg}
      alertErrorMsg={alertErrorMsg}
      onAlertClose={onAlertClose}
    />
  )
}

export default EmployeeListContainer
