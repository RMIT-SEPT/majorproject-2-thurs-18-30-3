import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import '../containers/App.css';

class Employees extends Component{
    constructor(props){
        super(props);
        this.state={
            employees: []
    }
}

    componentDidMount(){
        fetch('http://localHost:3004/employees').then(
            res => res.json()).then(
                (data) => {
                    this.setState({employees: data})
                }
            ).catch(
            console.log
            )
    }

    render(){
        let employees = this.state.employees.map((employees)=> {
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
        
}

export default Employees;