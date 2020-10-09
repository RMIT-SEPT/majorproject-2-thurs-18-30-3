import React from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../../services/auth.service'
import BookingCard from './BookingCard'

import '../../containers/App.css'

//Displays a user profile in a modal view

function ProfileBookings({change, bookingSet, deleteFunc}) {
  const [isEditing, setIsEditing] = React.useState(false);

  const [bookings, setBookings]=React.useState(bookingSet);

  const switchEditing = () =>
  {
    setIsEditing(!isEditing);
  }

  const cards = bookings.map((book) => {
    return( <BookingCard booking = {book}/>)
  });

  const edits = bookings.map((book) => {
    return( <div className = 'profile-booking-row'><button> <i className="material-icons md-32"> delete </i> </button><BookingCard booking = {book}/></div>)
  });

  return (
    <div className="modal-wrapper">
      <main className="modalPane">
        <div className="paneHeader">
            <button className="closeButton" onClick={() => change()}>
              <i className="material-icons md-32"> close </i>
            </button>
                <h2>Your Bookings</h2>
            <button className="editButton" onClick={switchEditing}>
                {isEditing ? 'cancel' : 'delete'}
            </button>
        </div>
        {isEditing ? edits : cards}
      </main>
    </div>
  )
}
export default ProfileBookings
