import React, { useState, useEffect } from 'react';

import '../containers/App.css';

//Display a single booking with details in its own component

function BookingDetail( { match } ) {
    useEffect(() => {
        fetchItem();
        console.log(match);
    });

    const [booking, setBooking] = useState({});

    const fetchItem = async () => {
        const fetchItem = await fetch(`http://localhost:3004/services/${match.params.id}`);

        const booking = await fetchItem.json();
        setBooking(booking);
        console.log(booking);
    }


    return (
        <div>
            <h1>{booking.title}</h1>
            <p>{booking.body}</p>
        </div> 
    );
}

export default BookingDetail;