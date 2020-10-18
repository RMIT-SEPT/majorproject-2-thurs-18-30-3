import React, {} from 'react'
import '../containers/App.css'
import axios from "axios";
import bookingApi from "../config/bookingApi";

import UpdateBookingDisplay from '../components/admin_components/UpdateBookingDisplay.js'

function UpdateBookingContainer({booking, active}) {

    
    const deleteBooking = () => {
      //remove bookings
      axios.delete(bookingApi.getBooking(booking.id), 
      ).then(response => {
        console.log(response);
        window.location.reload();
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