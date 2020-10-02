import React, {  } from 'react';
import serviceApi from "../config/serviceApi";
const { default: ServiceDetail } = require("../components/ServiceDetail");

//Retrieves data for detailed display of a single service
class ServiceDetailContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            service: {}
        }
    }

  //GET data request from API
  /*Forms an api request from the url passed to the page*/
  componentDidMount() {
    const { id } = this.props.match.params;
    const url = serviceApi.getService(id);
    
	  fetch(url).then(
      res => res.json()).then(
        (data) => {
          this.setState({ service: data })
        }
      ).catch(
        console.log
      )
  }
    
    render() {
      return <ServiceDetail service={this.state.service} />;
    }
  }
  export default ServiceDetailContainer;