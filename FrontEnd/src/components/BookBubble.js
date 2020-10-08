import React, {  } from 'react';

import '../containers/App.css';

//Displays a single clickable booking slot
function BookBubble({slot, onClick}) {
  const {startTime, date} = slot

  return (
    <button onClick={() => onClick(startTime, date)} className="book-bubble">
      <span>
        <h2>{startTime}</h2>
        <p>pm</p>
      </span>
      <p>{date}</p>
    </button>
  )
}
export default BookBubble;