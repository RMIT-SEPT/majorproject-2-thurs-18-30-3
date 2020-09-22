import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import MaterialTable from 'material-table'

import '../containers/App.css'

// Many props will be deleted after code refactoring
function Employees({employees, onRowAdd, onRowUpdate, onRowDelete, alertMsg, alertErrorMsg, onAlertClose}) {
  const classes = useStyles()
  const [columns] = useState([
    {title: 'Username', field: 'uname'},
    {title: 'Name', field: 'name'},
    {title: 'Email', field: 'email'},
    {title: 'Mobile', field: 'mobile'},
  ])

  //List structure which displays all employees
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={alertMsg !== '' || alertErrorMsg !== ''}
        onClose={onAlertClose}>
        <Alert onClose={onAlertClose} severity={alertMsg ? 'success' : 'error'}>
          {alertMsg}
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

//Styles for login form
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
  table: {
    minWidth: 650,
  },
}))

export default Employees
