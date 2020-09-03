import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MaterialTable from 'material-table'

import '../containers/App.css'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

function Employees(props) {
  const classes = useStyles()
  const [columns] = useState([
    {title: 'Username', field: 'uname'},
    {title: 'Name', field: 'name'},
    {title: 'Email', field: 'email'},
    {title: 'Mobile', field: 'phone'},
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
    // try {
    //   await axios.post('/api/customers', {name: 'sdf', mobile: 'sfdsdf'})
    //   setEmployees([...employees, newData])
    // } catch (err) {
    //   setAlertErrorMsg(err.messsage)
    // }
    // Use setTimeout to demonstrate time taken for API POST request.
    // Remove this line when backend guys finish implementing API handler.
    setTimeout(() => {
      setEmployees([...employees, newData])
      setAlertMsg('New record added!')
    }, 600)
  }

  async function onRowUpdate(newData, oldData) {
    setTimeout(() => {
      const data = [...employees]
      data[data.indexOf(oldData)] = newData
      setEmployees(data)
    }, 600)
  }

  async function onRowDelete(oldData) {
    setTimeout(() => {
      const data = [...employees]
      data.splice(data.indexOf(oldData), 1)
      setEmployees(data)
    }, 600)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={alertMsg !== ''}
        onClose={() => setAlertMsg('')}
        message="I love snacks">
        <Alert onClose={() => setAlertMsg('')} severity="success">
          {alertMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={alertErrorMsg !== ''}
        onClose={() => setAlertMsg('')}
        message="I love snacks">
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
