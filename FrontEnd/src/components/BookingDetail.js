import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../containers/App.css';

//Display a single booking with details in its own component

function BookingDetail( { match } ) {
    useEffect(() => {
        fetchItem();
        console.log(match);
    });

    const [booking, setBooking] = useState({});

    const fetchItem = async () => {
        try {
            const booking = await axios.get(`http://localhost:3004/services/${match.params.id}`).data
            setBooking(booking);
            console.log(booking);
        } catch (err) {
            alert('Something went wrong' + err)
        }
    }


    return (
        <div>
            <h1>{booking.title}</h1>
            <p>{booking.body}</p>
        </div> 
    );
}

export default BookingDetail;