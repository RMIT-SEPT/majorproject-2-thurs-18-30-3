import React from 'react'

const {default: AddBookingContainer} = require('../containers/AddBookingContainer')
const {default: UpdateBookingContainer} = require('../containers/UpdateBookingContainer')
const {default: ServiceList} = require('../components/admin_components/ServiceList')
const {default: AdminServiceDisplay} = require('../components/admin_components/AdminServiceDisplay')
//Retrieves bulk service data for display in list view
class ServicesContainer extends React.Component {
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
    fetch('http://localhost:8080/api/services/all')
      .then((res) => res.json())
      .then((data) => {
        this.setState({services: data});
        this.setState({displayServices: data});
      })
      .catch(console.log);

      fetch('http://localhost:8080/api/bookings/all')
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

  showAddSlot = () => {
    this.setState({isAddingSlot: true, isViewingSlot: false});
  }

  showViewSlot = (booking) => {
    this.setState({isAddingSlot: false, isViewingSlot: true});
    this.setState({focusedBooking: booking});
  }

  closePanel = () => {
    this.setState({isAddingSlot: false, isViewingSlot: false});
  }

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

          <AdminServiceDisplay bookings={this.state.displayBookings} 
            service={this.state.focusedService} plusFunc={this.showAddSlot} btnFunc={this.showViewSlot}/>

          <AddBookingContainer service={this.state.focusedService} active={this.state.isAddingSlot}/>

          <UpdateBookingContainer booking={this.state.focusedBooking} active={this.state.isViewingSlot}/>
        </div>
      </div>
    );
    //return <Services services={this.state.displayServices} searchFunc= {this.searchFor}/>
  }
}
export default ServicesContainer
