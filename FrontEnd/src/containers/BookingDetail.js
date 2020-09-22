import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../containers/App.css'

//Display a single booking with details in its own component
//TODO: Item under devloment 
function BookingDetail({match}) {
  const [booking, setBooking] = useState({})

  //Retrieves a peicifc service
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const booking = await axios.get(`http://localhost:8080/api/services/${match.params.id}`).data
        setBooking(booking)
        console.log(booking)
      } catch (err) {
        alert('Something went wrong' + err)
      }
    }
    fetchItem()
  })

  return (
    <div>
      <h1>{booking.title}</h1>
      <p>{booking.body}</p>
    </div>
  )
}

export default BookingDetail
