import React, { Component } from 'react';
const { default: Services } = require("../components/Services");

class ServiceListContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            services: []
        }
    }

    //GET data request from API
	/*If an API isn't running on your local machine, 
	replace the below fetch with 'https://jsonplaceholder.typicode.com/posts' for testing*/
    componentDidMount() {
		fetch('http://localhost:3004/services').then(
			res => res.json()).then(
				(data) => {
					this.setState({ services: data })
				}
			).catch(
				console.log
			)
    }
    
    render() {
      return <Services services={this.state.services} />;
    }
  }
  export default ServiceListContainer;