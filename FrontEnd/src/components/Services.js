import React from 'react'

import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import '../containers/App.css'
const {default: ServiceCard} = require('../components/ServiceCard')

const CURRENT_DATE = moment().format('YYYY-MM-DD')

//Displays Service cards
function Services(props) {

  //Props passed down by ServiceListContainer
  var services = props.services.map((service) => {
    return (
      //Render an item in booking list for each booking fetched
      <ServiceCard key={service.name} service={service} />
    )
  })

  //Function to handle service search
  const doSearch = (event) => {
    props.searchFunc(event.target.value);
  }

  return (
    <div className="container">
      <h1>Services</h1>

      {/*TODO: implement calendars to filter service view*/}
      <div className="sector-heading">
        <form noValidate data-testid="datePickerA">
          <TextField
            role="listbox"
            id="date"
            label="Display Services From"
            type="date"
            defaultValue={`${CURRENT_DATE}`}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <span> &#62; </span>
        <form noValidate data-testid="datePickerB">
          <TextField
            role="listbox"
            id="date"
            label="Display Services To"
            type="date"
            defaultValue={`${CURRENT_DATE}`}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>

      {/* Search Bar  */}
      <div className="dummy" />
        <form>
          <input role="searchbox" onChange={event => {doSearch(event)}} placeholder="Search" />
        </form>
      </div>

      <div className="services-gallery" role="main">
        {services}
      </div>
    </div>
  )
}
export default Services
