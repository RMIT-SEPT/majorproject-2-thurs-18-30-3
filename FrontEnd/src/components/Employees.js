import React from 'react';
import { Table } from 'reactstrap';

import '../containers/App.css';

//Displays list of Employees 

function Employees(props)
//Props passed down by EmployeeListContainer
{
        let employees = props.employees.map((employees)=> {
            return (
                <tr key = {employees.email} >

                    <td>{employees.email}</td>
                    <td>{employees.uname}</td>
                    <td>{employees.name}</td>
                    <td>{employees.phone}</td>
                </tr>
            )
         });

    return(
            <div className = "bookings-list">
                <Table>
                    <thead>
                        <tr>
                            <th>EMAIL</th>
                            <th>USERNAME</th>
                            <th>NAME</th>
                            <th>PHONE NUMBER</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees}
                    </tbody>
                </Table>
            </div>
        );
}



export default Employees;