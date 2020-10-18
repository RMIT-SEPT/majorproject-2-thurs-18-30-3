import React from 'react'

import '../../containers/App.css'

//Displays Services in a list view
function UpdateBookingDisplay({booking, deleteFunc}) {

  return (
      <main className="add-booking" role="main">
        <div className = 'add-booking-heading'>
          <h1>Time Slot</h1>
        </div>

        <div className = 'add-booking-body' role='cell'>
            <span>{booking.time}</span>
            <span>{booking.date}</span>
        </div>
        <hr></hr>
        
        <div className = 'add-booking-body' role='cell'>
          <h4>Booked by:</h4>
          <span>{(booking.customerId==null)?'NOT BOOKED':('Customer No.'+booking.customerId)}</span>
        </div>
        <div className = 'add-booking-body' role='cell'>
          <h4>Employee:</h4>
          <span>Employee No. {booking.employeeId}</span>
        </div>
        <hr></hr>
        <button className="actButton" onClick = {deleteFunc}>DELETE</button>
      </main>
  )
}
export default UpdateBookingDisplay
