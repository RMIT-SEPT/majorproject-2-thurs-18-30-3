import React from 'react'

import '../containers/App.css'
import ServiceSlide from './ServiceSlide'

//Displays the full details of a service, along with available bookings, in a landscape-view slide
function ServiceDetail(props) {
  const {service, availableBookings, onSubmit} = props

  return (
    <div>
      <div className="container">
        <h1>Services</h1>
        <div className="dummy" />
        <div>
          <a className="subHeading" href="/services">
            Go Back
          </a>
        </div>
        <div className="sector-heading">
          <div className="dummy" />
        </div>

        <div className="service-slide-container" role="main">
          <ServiceSlide availableBookings={availableBookings} service={service} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
