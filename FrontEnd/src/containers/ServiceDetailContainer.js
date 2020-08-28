import React, {  } from 'react';
const { default: ServiceDetail } = require("../components/ServiceDetail");

class ServiceDetailContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: 1,
            service: []
        }
    }

  //GET data request from API
  /*If an API isn't running on your local machine, 
  replace the below fetch with 'https://jsonplaceholder.typicode.com/posts' for testing*/
  componentDidMount() {
    var url = 'http://localhost:3004/services/' + this.state.id;
	fetch(url).then(
	 res => res.json()).then(
		(data) => {
			this.setState({ service: data })
		}
	 ).catch(
		console.log
     )
     
     console.log(this.state.service);
    }
    
    render() {
      return <ServiceDetail service={this.state.service} />;
    }
  }
  export default ServiceDetailContainer;