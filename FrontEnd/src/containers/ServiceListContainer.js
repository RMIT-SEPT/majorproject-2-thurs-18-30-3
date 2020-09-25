import React from 'react'
const {default: Services} = require('../components/Services')

//Retrieves bulk service data for display in list view
class ServiceListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
      displayServices: []
    }
  }

  //GET data request from API
  /*If an API isn't running on your local machine, 
	replace the below fetch with 'https://jsonplaceholder.typicode.com/posts' for testing*/
  componentDidMount() {
    fetch('http://localhost:8080/api/services')
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
    return <Services services={this.state.displayServices} searchFunc= {this.searchFor}/>
  }
}
export default ServiceListContainer
