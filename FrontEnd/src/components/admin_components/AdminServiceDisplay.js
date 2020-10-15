import React, {  } from 'react';

import '../../containers/App.css';

const {default: BookBubble} = require('../booking_components/BookBubble');

//Displays details of a service, with bookings displayed as clickable buttons
function AdminServiceDisplay({ service, bookings, plusFunc, btnFunc, updateFunc, deleteFunc}) {
    const [isEditing, setEditing] = React.useState(false);

    const handleDesc = (e) => {
        service.description = e.target.value;
    }

    const handleImage = (e) => {
        service.img = e.target.files[0];
    }

    const saveChanges = () => {
        updateFunc(service);
    }

    const deleteService = () =>
    {
        deleteFunc(service);
        alert("Service Deleted");
    }

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
        return(
            <form className="admin-edit-service" onSubmit={saveChanges}>
                <div className="edit-service-body">
                    <span>photo</span>
                    <label htmlFor="addService-file-Upload" className="addService-fileLabel">

                        {service.img? "" : "No Image"}
                        <div id="imgWrapper">
                            <img src={service.img ? URL.createObjectURL(service.img) : null} alt={service.img? service.name : null} width="170" height="110"/>
                        </div>
                    </label>
                    <input id="addService-file-Upload" type="file" onChange={handleImage}/>
                </div>

                <hr></hr>
                <div className = 'edit-service-body'>
                    <span>description</span>
                    <textarea onChange={handleDesc} value={service.description}/>
                    <div>
                        <button className = "actButton" type="submit">save</button>
                        <button className = "actButton" onClick={deleteService}>DELETE</button>
                    </div>
                    
                </div>
            </form>
        );
    }

    const bookingSlots = bookings.map((booking) => {return (<BookBubble booking={booking} actionFunc={() => btnFunc(booking)} key = {booking.id} />)})

	return (
        <main className = 'admin-service-display'>
            <div className = 'admin-service-heading'>
                <h1>{service.name}</h1>
                <div className="dummy"/>
                <button className = "icon-btn" onClick = {switchEditing}>
                    <i className="material-icons md-32">{isEditing ? 'cancel' : 'edit'}</i>
                </button>

            </div>
            {isEditing ? renderEditing() : renderBookings()}
            
        </main>
	);
	

}
export default AdminServiceDisplay;