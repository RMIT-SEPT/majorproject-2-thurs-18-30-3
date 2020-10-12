import React from 'react'

import '../containers/App.css'

//Displays a single clickable booking slot
function BookBubble({slot, onClick}) {
  const {time, date} = slot

  return (
    <button onClick={() => onClick(time, date)} className="book-bubble">
      <span>
        <h2>{time}</h2>
        <p>pm</p>
      </span>
      <p>{date}</p>
    </button>
  )
}
export default BookBubble
