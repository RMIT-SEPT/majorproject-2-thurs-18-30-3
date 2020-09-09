import React, {  } from 'react';

import '../containers/App.css';

//Displays a user profile
function ProfilePane({close, profile, reload, update}) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [displayName, setDisplayName] = React.useState(profile.name);
    const [displayEmail, setDisplayEmail] = React.useState(profile.email);
    const [displayPhone, setDisplayPhone] = React.useState(profile.phone);
    const [displayAddress, setDisplayAddress] = React.useState(profile.email);    

    const cancel = () => {
        setIsEditing(!isEditing);
        setDisplayName(profile.name);
        setDisplayEmail(profile.email);
        setDisplayPhone(profile.phone);
        setDisplayAddress(profile.email);
    }

    const save = () => {
        setIsEditing(!isEditing);
        update(displayEmail,displayName,displayPhone);
        reload();
    }

	return (
        <div className="modal-wrapper">
            <main className="modalPane">
                <div className="paneHeader">
                    <button className = "closeButton" onClick={() => close()}>&times;</button>
                    <div className = "book-bubble"/>
                    <button className = "editButton" onClick={() => cancel()}>{isEditing ? 'cancel' : 'edit'}</button>
                </div>
                <div className="paneBody">
                    <label htmlFor="uname">username</label> 
                    <input id="uname" name="uname" className="paneInput" disabled = {!isEditing} value={displayName} onChange={event => {setDisplayName(event.target.value)}}/>

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