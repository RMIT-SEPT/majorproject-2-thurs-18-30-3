import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import '../containers/App.css';

function Employees({employees}) {
    const renderEmployees = employees.map((employee)=>
         <tr key = {employee.email} >
        <td>{employee.email}</td>
        <td>{employee.uname}</td>
        <td>{employee.name}</td>
        <td>{employee.phone}</td>
    </tr>)

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
                    {renderEmployees}
                    </tbody>
                </Table>
            </div>
        )

}



export default Employees;