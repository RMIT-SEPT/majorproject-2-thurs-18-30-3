import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import MaterialTable from 'material-table'
import Axios from 'axios'

import '../containers/App.css'

function Employees(props) {
  const classes = useStyles()
  const [columns] = useState([
    {title: 'Username', field: 'uname'},
    {title: 'Name', field: 'name'},
    {title: 'Email', field: 'email'},
    {title: 'Mobile', field: 'mobile'},
  ])
  const [employees, setEmployees] = useState([])
  const [alertMsg, setAlertMsg] = useState('')
  const [alertErrorMsg, setAlertErrorMsg] = useState('')

  useEffect(() => {
    if (props.employees.length > 0) {
      setEmployees(props.employees)
    }
  }, [props.employees])

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
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={alertMsg !== ''}
        onClose={() => setAlertMsg('')}>
        <Alert onClose={() => setAlertMsg('')} severity="success">
          {alertMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={alertErrorMsg !== ''}
        onClose={() => setAlertErrorMsg('')}>
        <Alert onClose={() => setAlertErrorMsg('')} severity="error">
          {alertErrorMsg}
        </Alert>
      </Snackbar>
      <MaterialTable
        title="Employees"
        columns={columns}
        data={employees}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete,
        }}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
  table: {
    minWidth: 650,
  },
}))

export default Employees
