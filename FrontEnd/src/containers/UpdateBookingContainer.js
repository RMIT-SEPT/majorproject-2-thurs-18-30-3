import React, {} from 'react'
import '../containers/App.css'
import axios from "axios";

import UpdateBookingDisplay from '../components/admin_components/UpdateBookingDisplay.js'

function UpdateBookingContainer({booking, active}) {

    const API_BOOKINGS_URL = 'http://localhost:8082/api/bookings/';
    
    const deleteBooking = () => {
      //remove bookings
      axios.delete(API_BOOKINGS_URL+booking.id, 
      ).then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }

    if(!active)
    {
        return null;
    }

    return (
        <UpdateBookingDisplay booking={booking} deleteFunc={deleteBooking}/>
    );
         

}

export default UpdateBookingContainer;