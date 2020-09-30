import React, {  } from 'react';

import '../containers/App.css';
const {default: BookBubble} = require('../components/BookBubble');

//Displays details of a service, with bookings displayed as clickable buttons
//TODO: Implement booking functionality
function AdminServiceDisplay({ service, bookings, plusFunc}) {
    if(service == null)
    {
        return(<></>);
    }

    const bookingSlots = bookings.map((booking) => {return (<BookBubble booking={booking} actionFunc={null} key = {booking.id} />)})


	return (
        <main className = 'admin-service-display'>
            <div className = 'admin-service-heading'>
                <h1>{service.name}</h1>
            </div>

            <div className = 'admin-service-body'>
                <div className = 'admin-slot-counter'>
                    <h2>{bookings.length}</h2>
                    <h3>TIME SLOTS</h3>
                </div>
                <button onClick={plusFunc}>+</button>
            </div>

            <hr></hr>
            
            <div className = 'admin-service-bookings'>
                {bookingSlots}
            </div>
        </main>
	);
	

}
export default AdminServiceDisplay;