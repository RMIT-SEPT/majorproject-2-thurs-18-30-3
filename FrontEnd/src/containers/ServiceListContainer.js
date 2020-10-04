import React from 'react'
const {default: ServiceList} = require('../components/ServiceList')
const {default: AdminServiceDisplay} = require('../components/admin_components/AdminServiceDisplay')
//Retrieves bulk service data for display in list view
class ServicesContainer extends React.Component {
  constructor(props) {
    this.state = {
      services: [],
      displayServices: []
    }
  }

  //GET data request from API
  /*If an API isn't running on your local machine, 
	replace the below fetch with 'https://jsonplaceholder.typicode.com/posts' for testing*/
  componentDidMount() {
    fetch('http://localhost:8080/api/services/all')
      .then((res) => res.json())
      .then((data) => {
        this.setState({services: data});
        this.setState({displayServices: data});
      })
      .catch(console.log)
  }

  //Search function - if there si user input, filter services
  searchFor = (val) => {
    if(val === "")
    {
      this.setState({displayServices: this.state.services});
    }
    else
    {
      let newArray = this.state.services.filter(function (service) {
          return service.name.toLowerCase().includes(val.toLowerCase());
        });
        this.setState({displayServices: newArray});
    }
  }

  render() {
    if(this.state.services == null)
    {
      return <span>No Services Found</span>;
    }
    return <Services services={this.state.displayServices} searchFunc= {this.searchFor}/>
  }
}
export default ServicesContainer
