import React, {  } from 'react';
import '../../containers/App.css';

//Displays a single clickable booking slot
function BookBubble({ booking, actionFunc }) {
	return (
        <button className="book-bubble" onClick={actionFunc}>
            <span><h2>{booking.time}</h2><p>pm</p></span>
                <p>{booking.date}</p>
        </button>
	);	
}

export default BookBubble;