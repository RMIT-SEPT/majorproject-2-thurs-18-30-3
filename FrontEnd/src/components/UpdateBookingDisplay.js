import React from 'react'

import '../containers/App.css'

//Displays Services in a list view
function UpdateBookingDisplay(props) {

  //Props passed down by ServicesContainer
  const employees = props.employees.map((employee) => {
    return (
      <button className="service-btn" key = {employee.firstname}>{employee.firstname}</button>
    )
  })

  return (
      <main className="services-list" role="main">
        {employees}
      </main>
  )
}
export default UpdateBookingDisplay
