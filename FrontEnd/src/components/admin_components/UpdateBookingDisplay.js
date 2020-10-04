import React from 'react'

import '../../containers/App.css'

//Displays Services in a list view
function UpdateBookingDisplay({booking, employees, assignFunc}) {

  //Props passed down by ServicesContainer
  const empOptions = employees.map((employee) => {
    return (
      <option className="employee-option" key = {employee.firstname}>{employee.firstname}</option>
    )
  })

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
        <hr></hr>
        <h4>Assign Employee:</h4>

        <select name="employees" id="employees" multiple>
          {empOptions}
        </select>

        <button className="actButton">Confirm</button>
      </main>
  )
}
export default UpdateBookingDisplay
