import React from 'react'

import '../../containers/App.css'

//Displays Services in a list view
function ServiceList(props) {
  //Props passed down by ServicesContainer
  var services = props.services.map((service) => {
    return (
      <button className="service-btn" key = {service.name} onClick={event => {props.selectFunc(service)}}>{service.name}</button>
    )
  })

  //Function to handle service search
  const doSearch = (event) => {
    props.searchFunc(event.target.value);
  }
  
  return (
      <main className="services-list" role="main">
        <div className="services-list-header">
          <input role="searchbox" onChange={event => {doSearch(event)}} placeholder="search..." />
        </div>
        
        {services}
      </main>
  )
}
export default ServiceList
