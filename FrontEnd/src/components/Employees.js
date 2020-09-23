import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Snackbar, Dialog, DialogContent, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import MaterialTable from 'material-table'

import '../containers/App.css'
import Create from './Create'

// Many props will be deleted after code refactoring
function Employees({employees, onRowUpdate, onRowDelete, alertMsg, alertErrorMsg, onAlertClose}) {
  const classes = useStyles()
  const [columns] = useState([
    {title: 'Username', field: 'username', editable: 'never'},
    {title: 'Fist Name', field: 'firstName', validate: (rowData) => rowData.firstName !== ''},
    {title: 'Last Name', field: 'lastName', validate: (rowData) => rowData.lastName !== ''},
    {
      title: 'Password',
      field: 'password',
      validate: (rowData) => rowData.password !== '',
    },
    {title: 'Address', field: 'address', validate: (rowData) => rowData.address !== ''},
    {title: 'Mobile Number', field: 'mobileNum', validate: (rowData) => rowData.mobileNum !== ''},
  ])
  const [openAddDialog, setOpenAddDialog] = useState(false)

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

      <Dialog
        onClose={() => setOpenAddDialog(false)}
        aria-labelledby="customized-dialog-title"
        open={openAddDialog}
        maxWidth={'md'}>
        <DialogContent dividers>
          <Create forEmployee={true} />
        </DialogContent>
      </Dialog>

      <MaterialTable
        title="Employees"
        columns={columns}
        data={employees}
        editable={{
          onRowUpdate,
          onRowDelete,
        }}
      />

      <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
        Add Employee
      </Button>
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
