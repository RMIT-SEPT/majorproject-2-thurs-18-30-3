import React, {} from 'react'
import '../containers/App.css'
import axios from "axios";

import AddBookingDisplay from '../components/admin_components/AddBookingDisplay.js'

const createBooking = async (newName, newTime, newDate) => {
  const newBooking = {
    servicename: newName,
    customername: null,
    employeename : null,
    time: newTime,
    date: newDate
  };
  axios.post("http://localhost:8080/api/bookings", newBooking)
  .then(response => console.log(response))
  .catch(error => console.log(error));
};

//Adds a new service to backend
function AddBookingContainer({service,active}) {
 if(!active || service == null)
 {
     return null;
 }
  return (
    <AddBookingDisplay service={service} createFunc={createBooking}/>
  )
}

export default AddBookingContainer;