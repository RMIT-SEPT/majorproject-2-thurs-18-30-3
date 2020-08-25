import React, {  } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../containers/App.css';

//Displays a particular service

function ServiceCard({ service }) {
	return (
        <Link to={`/services/${service.id}`} style={{ textDecoration: 'none' }}>
            <Button className="service-card" role="cell">
                <img src="not-found.png" alt = {`{service.name}`}/>
                <div className="card-content">
                    <span>{service.title}</span>
                    <hr></hr>
                    <p>{service.body}</p>
                </div>
            </Button>
        </Link>
	);
	

}
export default ServiceCard;