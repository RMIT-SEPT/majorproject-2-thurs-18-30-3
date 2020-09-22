import React, {  } from 'react';

import '../containers/App.css';
const { default: Bubble } = require("../components/BookBubble");

//Displays details of a service, with bookings displayed as clickable buttons
//TODO: Implement booking functionality
function ServiceSlide({ service }) {
    const dummySlot = {time: '7:00',date:'23 Aug'};

	return (
        <main className = 'service-slide'>
            <div className = 'slide-heading'>
                <img src="not-found.png" alt = {`${service.title}`}/>
                <div className = 'slide-core'>
                    <h1>{service.title}</h1>
                    <p>{service.body}</p>
                </div>
            </div>
            <div className = 'slide-body'>
                <hr></hr>
                <h3>Available Bookings:</h3>
                <div className ='token-set'>
                    {/*Placeholders - TODO: Programmatically display bookings*/}
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                    <Bubble slot = {dummySlot}/>
                </div>
            </div>
        </main>
	);
	

}
export default ServiceSlide;