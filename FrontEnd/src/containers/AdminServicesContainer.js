import React from 'react'
import axios from "axios";

const {default: AddBookingContainer} = require('./AddBookingContainer')
const {default: UpdateBookingContainer} = require('./UpdateBookingContainer')
const {default: ServiceList} = require('../components/admin_components/ServiceList')
const {default: AdminServiceDisplay} = require('../components/admin_components/AdminServiceDisplay')

const API_SERVICE_URL = 'http://localhost:8080/api/services/';
const API_BOOKING_URL = 'http://localhost:8082/api/bookings/';

//Retrieves bulk service data for display in list view
class AdminServicesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
      bookings: [],
      displayServices: [],
      displayBookings: [],
      focusedService: null,
      focusedBooking: null,
      isAddingSlot: false,
      isViewingSlot: false
    }
  }

  //GET data request from API
  /*If an API isn't running on your local machine, 
	replace the below fetch with 'https://jsonplaceholder.typicode.com/posts' for testing*/
  componentDidMount() {
    fetch(API_SERVICE_URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({services: data});
        this.setState({displayServices: data});
      })
      .catch(console.log);

      fetch(API_BOOKING_URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({bookings: data});
      })
      .catch(console.log)
  }

  //Search function - if there is user input, filter services
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

  //Switch to 'add slot' from 'view slot details' pane
  showAddSlot = () => {
    this.setState({isAddingSlot: true, isViewingSlot: false});
  }

   //Switch to 'view slot details' from 'add slot' pane
  showViewSlot = (booking) => {
    this.setState({isAddingSlot: false, isViewingSlot: true});
    this.setState({focusedBooking: booking});
  }

  //Close 'view slot details' or 'add slot' pane
  closePanel = () => {
    this.setState({isAddingSlot: false, isViewingSlot: false});
  }

  //Target a service for display in booking detail panel
  focusService = (service) => {
    this.closePanel();

    if(service == null)
    {
      this.setState({displayServices: this.state.services});
      this.setState({displayBookings: this.state.bookings});
    }
    else
    {
      let newArray = this.state.bookings.filter(function (booking) {
          return booking.servicename.toLowerCase().includes(service.name.toLowerCase());
        });
      
      this.setState({displayBookings: newArray});
      this.setState({focusedService: service});
    }
  }

  //PUT request for changing profile data
  updateService = (service) => {
      axios.put(API_SERVICE_URL+service.id, 
      {
        id:service.id,
        name:service.name,
        description: service.description
        
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //DELETE request for removing a service
  deleteService = (service) => {
    axios.delete(API_SERVICE_URL+service.id, 
    ).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

    //remove bookings
    axios.delete('http://localhost:8080/api/bookings?servicename='+service.name, 
    ).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    if(this.state.services === null || this.state.services.length <= 0)
    {
      return <span>No Services Found</span>;
    }

    return (
      <div className="container">
      <h1>Services</h1>

        <div className="services"> 

          <ServiceList services={this.state.displayServices} searchFunc={this.searchFor} selectFunc={this.focusService}/>

          <AdminServiceDisplay bookings={this.state.displayBookings} service={this.state.focusedService}
            plusFunc={this.showAddSlot} btnFunc={this.showViewSlot} updateFunc={this.updateService} deleteFunc={this.deleteService}/>

          <AddBookingContainer service={this.state.focusedService} active={this.state.isAddingSlot}/>

          <UpdateBookingContainer booking={this.state.focusedBooking} active={this.state.isViewingSlot}/>
        </div>
      </div>
    );
    //return <Services services={this.state.displayServices} searchFunc= {this.searchFor}/>
  }
}
export default AdminServicesContainer
