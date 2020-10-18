import React from 'react'

import '../containers/App.css'

//Displays a single clickable booking slot
function BookBubble({slot, onClick}) {
  const {id, time, date} = slot

  return (
    <button onClick={() => onClick(id, time, date)} className="book-bubble">
      <span>
        <h2>{time}</h2>
      </span>
      <p>{date}</p>
    </button>
  )
}
export default BookBubble
