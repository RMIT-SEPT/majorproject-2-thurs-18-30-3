import React from 'react'
import {Button, Card} from 'reactstrap'
import {Link} from 'react-router-dom'

import '../containers/App.css'

//Displays list of Employees

function Services(props) {
  //Props passed down by ServiceListContainer

  let services = props.services.map((service) => {
    return (
      //Render an item in booking list for each booking fetched
      <Card key={service.id}>
        <Card.Title>{service.id}</Card.Title>

        <Link to={`/services/${service.id}`} className="booking-link">
          <td>{service.title}</td>
        </Link>

        <Card.Body>{service.body}</Card.Body>

        <td>
          <Button color="success" size="l">
            Book
          </Button>
        </td>
      </Card>
    )
  })
  return <div>{services}</div>
}
export default Services
