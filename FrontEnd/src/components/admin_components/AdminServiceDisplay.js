import React, {  } from 'react';

import '../../containers/App.css';

const {default: BookBubble} = require('../BookBubble');

//Displays details of a service, with bookings displayed as clickable buttons
//TODO: Implement booking functionality
function AdminServiceDisplay({ service, bookings, plusFunc, btnFunc}) {
    const [isEditing, setEditing] = React.useState(false);

    if(service == null)
    {
        return(<></>);
    }

    const switchEditing = () => {
        setEditing(!isEditing);
    }
    const renderBookings = () => {
        return(<>
            <div className = 'admin-service-body'>
                <div className = 'admin-slot-counter'>
                    <h2>{bookings.length}</h2>
                    <h3>TIME SLOTS</h3>
                </div>
                <button onClick={plusFunc}>+</button>
            </div>

            <hr></hr>
            
            <div className = 'admin-service-bookings'>
                {bookingSlots}
            </div> 
        </>);
    }

    const renderEditing = () => {
        return(<>
            <div className = 'admin-service-body'>
                <img src={service.img}></img >
            </div>
            <hr></hr>
            <div className = 'admin-service-body'>
                <textarea value={service.description}></textarea >
            </div>
            <button className = "actButton">save</button>
            </>);
    }

    const bookingSlots = bookings.map((booking) => {return (<BookBubble booking={booking} actionFunc={() => btnFunc(booking)} key = {booking.id} />)})

	return (
        <main className = 'admin-service-display'>
            <div className = 'admin-service-heading'>
                <h1>{service.name}</h1>

                <button className = "icon-btn" onClick = {switchEditing}>
                    <i class="material-icons md-32">{isEditing ? 'cancel' : 'edit'}</i>
                </button>

            </div>
            {isEditing ? renderEditing() : renderBookings()}
            
        </main>
	);
	

}
export default AdminServiceDisplay;