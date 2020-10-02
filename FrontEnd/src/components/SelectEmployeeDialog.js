import React, {useState} from 'react'
import {Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem} from '@material-ui/core'

function SelectEmployeeDialog({employees, open, setOpen, onSubmit}) {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]?.username)

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setSelectedEmployee(event.target.value)
  }

  const handleBookBtn = () => {
    onSubmit(selectedEmployee)
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select Employee</DialogTitle>
      <DialogContent>
        <Grid item xs={6}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedEmployee}
            onChange={handleChange}
            fullWidth>
            {employees.map(({username, firstName, lastName}) => (
              <MenuItem value={username}>{firstName + ' ' + lastName}</MenuItem>
            ))}
          </Select>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleBookBtn} color="primary">
          Book
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectEmployeeDialog
