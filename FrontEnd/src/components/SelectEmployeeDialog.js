import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem} from '@material-ui/core'

function SelectEmployeeDialog({employees, open, setOpen, onSubmit}) {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]?.username)

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setSelectedEmployee(event.target.value)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select Employee</DialogTitle>
      <DialogContent>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedEmployee}
          onChange={handleChange}>
          {employees.map(({username, firstName, lastName}) => (
            <MenuItem value={username}>{firstName + ' ' + lastName}</MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} color="primary">
          Book
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectEmployeeDialog
