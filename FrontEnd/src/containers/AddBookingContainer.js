import React, {useEffect} from 'react'
import '../containers/App.css'
import axios from "axios";

import UserType from '../config/userType'
import AddBookingDisplay from '../components/admin_components/AddBookingDisplay.js'

const API_BOOKING_URL = 'http://localhost:8082/api/bookings/';
const API_USER_URL = 'http://localhost:8081/api/users/';

//Add booking to the backend
const createBooking = async (newName, newTime, newDate, newEmployee) => {
  if(newTime === "" || newDate === "" || newEmployee === "")
  {
    return null;
  }
  const newBooking = {
    servicename: newName,
    customername: null,
    employeename : newEmployee,
    time: newTime,
    date: newDate
  };
  axios.post(API_BOOKING_URL, newBooking)
  .then(response => console.log(response))
  .catch(error => console.log(error));
};

//Adds a new service to backend
function AddBookingContainer({service,active}) {
  const [employees, setEmployees] = React.useState([])

  //Retrieves employees 
  useEffect(() => {
    async function callAPI() {
      try {
        const {data} = await axios.get(API_USER_URL);
        setEmployees(data.filter((d) => d.usertype === UserType.Employee))
      } catch (err) {
        console.log(err.message)
      }
    }
    callAPI()
  }, [])

 if(!active || service == null)
 {
     return null;
 }
  return (
    <AddBookingDisplay service={service} employees={employees} createFunc={createBooking}/>
  )
}

export default AddBookingContainer;