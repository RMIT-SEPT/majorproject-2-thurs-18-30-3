import React, {useEffect} from 'react'
import '../containers/App.css'
import axios from "axios";
import UserType from '../config/userType'

import UpdateBookingDisplay from '../components/admin_components/UpdateBookingDisplay.js'

function UpdateBookingContainer({booking, active}) {

    const [employees, setEmployees] = React.useState([]);

    useEffect(()=> {
        fetch('http://localhost:8080/api/users/all')
          .then((res) => res.json())
          .then((data) => {
            setEmployees(data.filter((d) => d.usertype === UserType.Employee));
          })
          .catch(console.log)
    }, [])

    const assignEmployee = async (bookingid, newEmployeeid) => {
        axios.put('http://localhost:8080/api/bookings/'+bookingid, 
        {
            employeeid: newEmployeeid
        })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    };

    if(!active)
    {
        return null;
    }

    return (
        <UpdateBookingDisplay booking={booking} 
            employees={employees} assignFunc={assignEmployee}/>
        );
         

}

export default UpdateBookingContainer;