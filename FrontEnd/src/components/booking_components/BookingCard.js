import React from 'react'

import '../../containers/App.css'

function BookingCard({booking}) {
    return (
        <div className="booking-card" role="cell">
            <div className="booking-card-header">
                <span>{booking.time}</span>
                <h3>{booking.date}</h3>
            </div>
            <h2>{booking.serviceName}</h2>
            <span>Employee No:{booking.employeeId}</span>
        </div>
    )
}

export default BookingCard