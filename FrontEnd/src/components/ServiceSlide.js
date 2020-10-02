import React from 'react'

import '../containers/App.css'
import Bubble from '../components/BookBubble'

//Displays details of a service, with bookings displayed as clickable buttons
//TODO: Implement booking functionality
function ServiceSlide({service}) {
  // const dummySlot = {time: '7:00',date:'23 Aug'};

  const onBubbleClick = (startTime, date) => {}

  return (
    <main className="service-slide">
      <div className="slide-heading">
        <img src={service.imageUrl} alt="not found" width="340" height="220" />
        <div className="slide-core">
          <h1>{service.name}</h1>
          <p>{service.description}</p>
        </div>
      </div>
      <div className="slide-body">
        <hr />
        <h3>Available Bookings:</h3>

        <div className="token-set">
          {service.availableBookings?.map((booking) => (
            <Bubble onClick={onBubbleClick()} slot={booking} />
          ))}
        </div>
      </div>
    </main>
  )
}
export default ServiceSlide
