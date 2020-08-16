import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../containers/App.css';

//Displays list of Employees 

class Services extends Component {
    constructor(props){
        super(props);
    }

	//Props passed down by ServiceListContainer

    render() {
		let services = this.props.services.map((service) => {
			return (
				//Render an item in booking list for each booking fetched
				<tr key ={service.id}>

					<td>{service.id}</td>

					<Link to={`/services/${service.id}`} className = "booking-link">
						<td>{service.title}</td>
					</Link>

					<td>{service.body}</td>

					<td>
						<Button color = "success" size = 'l'>Book</Button>
					</td>
				</tr>
				
			) 
		});
		return (
		<div className = "services-list">
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>SERVICE</th>
						<th>DESCRIPTION</th>
						<th>ACTION</th>
					</tr>
				</thead>

				<tbody>
					{services}
				</tbody>
			</Table>
		</div>
		);
	}

}
export default Services;