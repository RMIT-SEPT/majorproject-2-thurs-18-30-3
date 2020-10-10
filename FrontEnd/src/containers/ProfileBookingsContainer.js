import React, {useEffect} from 'react'
import axios from 'axios'

import ProfileBookings from '../components/booking_components/ProfileBookings'
import AuthService from '../services/auth.service'
import '../containers/App.css'

const API_BOOKINGS_URL = 'http://localhost:8080/api/bookings/'
const API_USERS_URL = 'http://localhost:8080/api/users/'
//Retrieves and displays current user profile data
const ProfileBookingsContainer = ({change}) => {

  //User profile for bookings data
  const [profile, setProfile] = React.useState({});
  const [bookings, setBookings] = React.useState(profile.bookings);

  useEffect(() => {
    loadProfile();
    loadBookings();
  }, [])

  //API call to retrieve user data
  const loadProfile = async () => {
    if (!AuthService.getCurrentUser()) {
      
      return null
    }
    try {
      const url = API_USERS_URL.concat(AuthService.getCurrentUser().username)
      const res = await fetch(url)
      const data = await res.json()
      setProfile(data)
    } catch (err) {
      alert(err)
    }
  }

  const deleteBooking = (booking) => {
    //remove bookings
    axios.delete(API_BOOKINGS_URL+booking.id, 
    ).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const loadBookings = async () => {
    if (!AuthService.getCurrentUser()) {
      
      return null
    }
    try {
      const url = API_BOOKINGS_URL+'?customername='+ (AuthService.getCurrentUser().username)
      const res = await fetch('http://localhost:8080/api/bookings?customername=aa')
      const data = await res.json()
      setBookings(data)
    } catch (err) {
      alert(err)
    }
  }

  return <ProfileBookings change = {change} bookingSet = {bookings} deleteFunc = {deleteBooking}/>
}

export default ProfileBookingsContainer
