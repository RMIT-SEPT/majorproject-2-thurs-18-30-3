import React, {  } from 'react';
import TextField from '@material-ui/core/TextField';
import '../containers/App.css';
const { default: ServiceCard } = require("../components/ServiceCard");


//Displays list of Employees 

function Services (props){
        

	//Props passed down by ServiceListContainer

    
		let services = props.services.map((service) => {
			return (
				//Render an item in booking list for each booking fetched
					<ServiceCard service={service} />
			) 
		});
		return (
		<div>
			<h1>Services</h1>

			<div className = "sector-heading">
				<form noValidate>
					<TextField
						id="date"
						label="Birthday"
						type="date"
						defaultValue="2017-05-24"
						InputLabelProps={{
						shrink: true,
						}}
					/>
				</form>
				<span>  &#62; </span>
				<form noValidate>
					<TextField
						id="date"
						label="Birthday"
						type="date"
						defaultValue="2017-05-24"
						InputLabelProps={{
						shrink: true,
						}}
					/>
				</form>
				<div className="dummy"/>
				<form>
					<input
						className="service-search"
						placeholder="Search" 
					/>
				</form>
			</div>

			<hr className = "sector-divider"/>

			<div className = "services-gallery">
					{services}
			</div>
		</div>
		);
	

}
export default Services;