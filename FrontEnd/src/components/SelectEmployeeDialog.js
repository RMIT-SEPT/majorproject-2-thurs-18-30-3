import React from 'react'
import {Dialog, DialogTitle, DialogContent, Select, MenuItem} from '@material-ui/core'

function SelectEmployeeDialog({open, setOpen}) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select Employee</DialogTitle>
      <DialogContent>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={10}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </DialogContent>
    </Dialog>
  )
}

export default SelectEmployeeDialog
