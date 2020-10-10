import React from 'react'

import '../../containers/App.css'

//Displays Services in a list view
function UpdateBookingDisplay({booking, deleteFunc}) {

  return (
      <main className="add-booking" role="main">
        <div className = 'add-booking-heading'>
          <h1>Time Slot</h1>
        </div>

        <div className = 'add-booking-body'>
            <span>{booking.time}</span>
            <span>{booking.date}</span>
        </div>
        <hr></hr>
        
        <div className = 'add-booking-body'>
          <h4>Booked by:</h4>
          <span>Max de Winter</span>
        </div>
        <div className = 'add-booking-body'>
          <h4>Employee:</h4>
          <span>{booking.employeename}</span>
        </div>
        <hr></hr>
        <button className="actButton" onClick = {deleteFunc}>DELETE</button>
      </main>
  )
}
export default UpdateBookingDisplay
