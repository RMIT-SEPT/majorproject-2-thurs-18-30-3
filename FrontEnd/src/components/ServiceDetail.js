import React from 'react';

import '../containers/App.css';
const { default: ServiceSlide } = require("./ServiceSlide");

function BookingDetail( props ) {
    
    const slide = props.service;
    console.log(slide);
    return (
        <div>
            <h1>Services</h1>
			<div className="dummy"/>
			<div>
                <a>Go Back</a>
			</div>
            <div className = "sector-heading">
                <div className="dummy"/>
            </div>

            <hr className = "sector-divider"/>
            <div class = 'service-slide-container' role = 'main'>
                <ServiceSlide service={slide} />
            </div>
        </div> 
    );
}

export default BookingDetail;