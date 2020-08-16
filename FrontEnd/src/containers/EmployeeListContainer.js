import React, { Component } from 'react';
const { default: Employees } = require("../components/Employees");

class EmployeeListContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            employees: []
        }
    }

    //GET data request from API
	/*If an API isn't running on your local machine, 
	replace the below fetch with 'https://jsonplaceholder.typicode.com/posts'*/
    componentDidMount(){
        Promise.all([
            fetch("http://localhost:3000/admins"),
            fetch("http://localhost:3000/employees"),
            fetch("http://localhost:3000/customers")
        ]).then(([admins, employees, customers]) => {
            console.log(admins.concat(employees, customers))
    }).catch(
        console.log
    )
}
}

  export default EmployeeListContainer;