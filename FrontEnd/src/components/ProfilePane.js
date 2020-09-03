import React, {  } from 'react';

import '../containers/App.css';

//Displays a user profile
function ProfilePane({close, profile, update}) {
    const [isEditing, setIsEditing] = React.useState(false);

    const edit = () => {
        if(isEditing)
        {
            update(profile.email,profile.name,profile.phone);
        }

        setIsEditing(!isEditing);
    }

	return (
        <div className="modal-wrapper">
            <main className="modalPane">
                <div className="paneHeader">
                    <button className = "closeButton" onClick={() => close()}>&times;</button>
                    <div className = "book-bubble"/>
                    <button className = "editButton" onClick={() => edit()}>{isEditing ? 'save' : 'edit'}</button>
                </div>
                <div className="paneBody">
                    <label htmlFor="uname">username</label> 
                    <input id="uname" name="uname" className="paneInput" disabled = {!isEditing} defaultValue={profile.name} onChange={event => {profile.name=event.target.value}}/>

                    <label htmlFor="email">email</label>
                    <input id="email" name="email" className="paneInput" disabled = {!isEditing} defaultValue={profile.email} onChange={event => {profile.email=event.target.value}}/>

                    <label htmlFor="phNum">phone number</label>
                    <input id="phNum" name="phNum" className="paneInput" disabled = {!isEditing} defaultValue={profile.phone} onChange={event => {profile.phone=event.target.value}}/>
                    <button className = "actButton">bookings</button>
                </div>
            </main>
        </div>
	);
}
export default ProfilePane;