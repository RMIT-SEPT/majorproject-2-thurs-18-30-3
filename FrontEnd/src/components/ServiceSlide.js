import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Button, Grid} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Axios from 'axios'

import Bubble from '../components/BookBubble'

import '../containers/App.css'
import BookingApi from '../config/bookingApi'
import AuthService from '../services/auth.service'

//Displays details of a service, with bookings displayed as clickable buttons
function ServiceSlide({service, availableBookings}) {
  // const dummySlot = {time: '7:00',date:'23 Aug'};

  const [alertMsg, setAlertMsg] = useState('')
  const [alertErrorMsg, setAlertErrorMsg] = useState('')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState('')
  const [selectedStartTime, setSelectedStartTime] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const onBubbleClick = (id, startTime, date) => {
    setSelectedBookingId(id)
    setSelectedStartTime(startTime)
    setSelectedDate(date)
    setDialogOpen(true)
  }

  const handleBookBtn = async () => {
    const customerId = AuthService.getCurrentUser()?.id
    if (!customerId) setAlertErrorMsg('Customer ID not found')

    const payload = {
      serviceName: service.name,
      customerId: customerId,
      time: selectedStartTime,
      date: selectedDate,
    }
    try {
      const {data} = await Axios.put(BookingApi.getBooking(selectedBookingId), payload)
      console.log('Booking response data', data)
      setTimeout(() => window.location.reload(), 500)
    } catch ({message}) {
      setAlertErrorMsg(message)
    }
    handleClose()
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const onAlertClose = () => {
    setAlertMsg('')
    setAlertErrorMsg('')
  }

  return (
    <>
      <main className="service-slide">
        <div className="slide-heading">
          <img src={service.photo} alt="not found" width="340" height="220" />
          <div className="slide-core">
            <h1>{service.name}</h1>
            <p>{service.description}</p>
          </div>
        </div>
        <div className="slide-body">
          <hr />
          <h3>Available Bookings:</h3>

          <div className="token-set">
            {availableBookings?.map((booking, index) => (
              <Bubble key={index} onClick={onBubbleClick} slot={booking} />
            ))}
          </div>
        </div>
      </main>

      <Dialog fullWidth open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{service.name}</DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            {selectedStartTime} pm
          </Grid>
          <Grid item xs={12}>
            {selectedDate}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBookBtn} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={alertMsg !== '' || alertErrorMsg !== ''}
        onClose={onAlertClose}>
        <Alert onClose={onAlertClose} severity={alertMsg ? 'success' : 'error'}>
          {alertMsg}
          {alertErrorMsg}
        </Alert>
      </Snackbar>
    </>
  )
}
export default ServiceSlide
