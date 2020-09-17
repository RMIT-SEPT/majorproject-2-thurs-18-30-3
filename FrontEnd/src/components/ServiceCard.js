import React from 'react'
import {Link} from 'react-router-dom'

import '../containers/App.css'

//Displays a particular service in a small, granular card
function ServiceCard({service}) {
  return (
    <Link to={`/services/${service.id}`} style={{textDecoration: 'none'}}>
      <button className="service-card" role="cell">
       
        <div className="card-content">
          <span>{service.title}</span>
          <hr></hr>
          <p>{service.body}</p>
        </div>
      </button>
    </Link>
  )
}
export default ServiceCard
