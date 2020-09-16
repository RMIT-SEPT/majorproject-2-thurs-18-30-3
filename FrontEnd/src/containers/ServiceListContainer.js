import React from 'react'
const {default: Services} = require('../components/Services')

//Retrieves bulk service data for display in list view
class ServiceListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
    }
  }

  //GET data request from API
  /*If an API isn't running on your local machine, 
	replace the below fetch with 'https://jsonplaceholder.typicode.com/posts' for testing*/
  componentDidMount() {
    fetch('http://localhost:8080/api/services')
      .then((res) => res.json())
      .then((data) => {
        this.setState({services: data})
      })
      .catch(console.log)
  }

  searchFor = (val) => {
    let url = 'http://localhost:8080/api/services?title='+val;
    
    if(val === "")
    {
      let url = 'http://localhost:8080/api/services';
    }

    return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      this.setState({services: data})
    })
    .catch(console.log)
  }

  render() {
    return <Services services={this.state.services} searchFunc= {this.searchFor}/>
  }
}
export default ServiceListContainer
