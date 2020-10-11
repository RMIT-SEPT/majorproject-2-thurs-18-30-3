import React, {useEffect} from 'react'
import '../containers/App.css'
import axios from "axios";

import UserApi from '../config/userApi'
import UserType from '../config/userType'
import AddBookingDisplay from '../components/admin_components/AddBookingDisplay.js'
import userApi from '../config/userApi';
import bookingApi from '../config/bookingApi';

//Add booking to the backend
const createBooking = async (newName, newTime, newDate, newEmployee) => {
  if(newTime === "" || newDate === "" || newEmployee === "")
  {
    alert('missing data');
    return false;
  }
  const newBooking = {
    serviceName: newName,
    customerId: null,
    employeeId: newEmployee,
    time: newTime,
    date: newDate
  };
  axios.post(bookingApi.getUrl, newBooking)
  .then(response => console.log(response))
  .catch(error => console.log(error));
  return true;
};

//Adds a new service to backend
function AddBookingContainer({service,active}) {
  const [employees, setEmployees] = React.useState([])

  //Retrieves employees 
  useEffect(() => {
    async function callAPI() {
      try {
        const {data} = await axios.get(userApi.getAllUsers);
        setEmployees(data.filter((d) => d.userType === UserType.Employee))
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