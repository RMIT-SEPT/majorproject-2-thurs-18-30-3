import React, {useState} from 'react'

import '../containers/App.css'
import Bubble from '../components/BookBubble'
import SelectEmployeeDialog from './SelectEmployeeDialog'

//Displays details of a service, with bookings displayed as clickable buttons
//TODO: Implement booking functionality
function ServiceSlide({service}) {
  // const dummySlot = {time: '7:00',date:'23 Aug'};
  const [startTime, setStartTime] = useState('')
  const [date, setDate] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const onBubbleClick = (startTime, date) => {
    setStartTime(startTime)
    setDate(date)
    setDialogOpen(true)
  }

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
            <Bubble parentOnClick={onBubbleClick} slot={booking} />
          ))}
        </div>
      </div>
      <SelectEmployeeDialog open={dialogOpen} setOpen={setDialogOpen} startTime={startTime} date={date} />
    </main>
  )
}
export default ServiceSlide
