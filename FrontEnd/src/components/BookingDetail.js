import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../containers/App.css';

function BookingDetail( { match } ) {
    useEffect(() => {
        fetchItem();
        console.log(match);
    }, []);

    const [booking, setBooking] = useState({});

    const fetchItem = async () => {
        const fetchItem = await fetch(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`);

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