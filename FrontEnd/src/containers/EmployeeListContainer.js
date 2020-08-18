import React, {  } from 'react';
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
        fetch('http://localHost:3004/employees').then(
            res => res.json()).then(
                (data) => {
                    this.setState({employees: data})
                }
            ).catch(
            console.log
            )
    }
    
    render() {
      return <Employees employees={this.state.employees} />;
    }
  }
  export default EmployeeListContainer;