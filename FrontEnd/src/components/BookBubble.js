import React from 'react'

import '../containers/App.css'

//Displays a single clickable booking slot
function BookBubble({slot, parentOnClick}) {
  const {startTime, date} = slot

  const onButtonClick = () => {
    parentOnClick(startTime, date)
  }

  return (
    <button onClick={onButtonClick} className="book-bubble">
      <span>
        <h2>{startTime}</h2>
        <p>pm</p>
      </span>
      <p>{date}</p>
    </button>
  )
}
export default BookBubble
