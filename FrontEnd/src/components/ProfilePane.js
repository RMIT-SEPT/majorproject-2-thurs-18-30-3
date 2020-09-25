import React from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../services/auth.service'

import '../containers/App.css'

//Displays a user profile in a modal view

function ProfilePane({close, profile, reload, update}) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [displayFirstName, setDisplayFirstName] = React.useState(profile.firstName)
  const [displayLastName, setDisplayLastName] = React.useState(profile.lastName)
  const [displayEmail, setDisplayEmail] = React.useState(profile.email)
  const [displayPhone, setDisplayPhone] = React.useState(profile.mobileNum)
  const [displayAddress, setDisplayAddress] = React.useState(profile.address)

  //Fires when clicking the cancel button - reinitialises profile data.
  const cancel = () => {
    setIsEditing(!isEditing)
    setDisplayFirstName(profile.firstName)
    setDisplayLastName(profile.lastName)
    setDisplayEmail(profile.email)
    setDisplayPhone(profile.mobileNum)
    setDisplayAddress(profile.address)
  }

  //Fires when clicking the save button - commits profile data.
  const save = () => {
    setIsEditing(!isEditing)
    update(displayEmail, displayFirstName, displayLastName, displayPhone, displayAddress)
    reload()
  }

  return (
    <div className="modal-wrapper">
      <main className="modalPane">
        <div className="paneHeader">
          <button className="closeButton" onClick={() => close()}>
            &times;
          </button>

          {/*TODO:Display image*/}
          <div className="book-bubble" />

          {/*Data is displayed in editable fields - this button enables/disables editing*/}
          <button className="editButton" onClick={() => cancel()}>
            {isEditing ? 'cancel' : 'edit'}
          </button>
        </div>
        <div className="paneBody">
          <label htmlFor="fname">name</label>
          <input
            id="fname"
            name="fname"
            className="paneInput"
            disabled={!isEditing}
            value={displayFirstName}
            onChange={(event) => {
              setDisplayFirstName(event.target.value)
            }}
          />

          <label htmlFor="lname">surname</label>
          <input
            id="lname"
            name="lname"
            className="paneInput"
            disabled={!isEditing}
            value={displayLastName}
            onChange={(event) => {
              setDisplayLastName(event.target.value)
            }}
          />

          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            className="paneInput"
            disabled={!isEditing}
            value={displayEmail}
            onChange={(event) => {
              setDisplayEmail(event.target.value)
            }}
          />

          <label htmlFor="phNum">phone number</label>
          <input
            id="phNum"
            name="phNum"
            className="paneInput"
            disabled={!isEditing}
            value={displayPhone}
            onChange={(event) => {
              setDisplayPhone(event.target.value)
            }}
          />

          <label htmlFor="phNum">address</label>
          <input
            id="address"
            name="address"
            className="paneInput"
            disabled={!isEditing}
            value={displayAddress}
            onChange={(event) => {
              setDisplayAddress(event.target.value)
            }}
          />
          <div className="button-set">
            {isEditing ? (
              <button className="actButton" onClick={() => save()}>
                save
              </button>
            ) : (
              <>
                <button className="actButton">bookings</button>
                <Link to="/service">
                  {/*Logout button also closes the pane and reloads the page*/}
                  <button
                    className="actButton"
                    onClick={() => {
                      AuthService.logout()
                      close()
                      window.location.reload()
                    }}>
                    log out
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export default ProfilePane
