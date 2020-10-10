import React from 'react'

import '../../containers/App.css'

function BookingCard({booking}) {
    return (
        <main className="booking-card">
            <div className="booking-card-header">
                <span>{booking.time}</span>
                <h3>{booking.date}</h3>
            </div>
            <h2>{booking.servicename}</h2>
            <span>Employees:</span>
        </main>
    )
}

export default BookingCard