import React, {  } from 'react';

import '../containers/App.css';

//Displays a user profile in a modal view

function ProfilePane({close, profile, reload, update}) {

    const [isEditing, setIsEditing] = React.useState(false);
    const [displayFirstName, setDisplayFirstName] = React.useState(profile.name);
    const [displayLastName, setDisplayLastName] = React.useState(profile.name);
    const [displayEmail, setDisplayEmail] = React.useState(profile.email);
    const [displayPhone, setDisplayPhone] = React.useState(profile.phone);
    const [displayAddress, setDisplayAddress] = React.useState(profile.address);    

    //Fires when clicking the cancel button - reinitialises profile data.
    const cancel = () => {
        setIsEditing(!isEditing);
        setDisplayFirstName(profile.firstname);
        setDisplayLastName(profile.lastname);
        setDisplayEmail(profile.email);
        setDisplayPhone(profile.phone);
        setDisplayAddress(profile.address);
    }

    //Fires when clicking the save button - commits profile data.
    const save = () => {
        setIsEditing(!isEditing);
        update(displayEmail,displayFirstName,displayLastName,displayPhone,setDisplayAddress);
        reload();
    }
    
	return (
        <div className="modal-wrapper">
            <main className="modalPane">
                <div className="paneHeader">
                    <button className = "closeButton" onClick={() => close()}>&times;</button>

                    {/*TODO:Display image*/}
                    <div className = "book-bubble"/>

                    {/*Data is displayed in editable fields - this button enables/disables editing*/}
                    <button className = "editButton" onClick={() => cancel()}>{isEditing ? 'cancel' : 'edit'}</button>
                </div>
                <div className="paneBody">
                    <label htmlFor="uname">name</label> 
                    <input id="uname" name="uname" className="paneInput" disabled = {!isEditing} value={displayFirstName} onChange={event => {setDisplayFirstName(event.target.value)}}/>

                    <label htmlFor="uname">surname</label> 
                    <input id="uname" name="uname" className="paneInput" disabled = {!isEditing} value={displayLastName} onChange={event => {setDisplayLastName(event.target.value)}}/>

                    <label htmlFor="email">email</label>
                    <input id="email" name="email" className="paneInput" disabled = {!isEditing} value={displayEmail} onChange={event => {setDisplayEmail(event.target.value)}}/>

                    <label htmlFor="phNum">phone number</label>
                    <input id="phNum" name="phNum" className="paneInput" disabled = {!isEditing} value={displayPhone} onChange={event => {setDisplayPhone(event.target.value)}}/>

                    <label htmlFor="phNum">address</label>
                    <input id="address" name="address" className="paneInput" disabled = {!isEditing} value={displayAddress} onChange={event => {setDisplayAddress(event.target.value)}}/>

                    {isEditing
                        ? <button className = "actButton" onClick={() => save()}>save</button>
                        : <button className = "actButton">bookings</button>
                    }
                    
                </div>
            </main>
        </div>
	);
}
export default ProfilePane;