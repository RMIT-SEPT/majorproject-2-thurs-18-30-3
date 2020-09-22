import React, {  } from 'react';

import '../containers/App.css';

//Displays a single clickable booking slot
function BookBubble({ slot }) {
	return (
        <button className="book-bubble">
            <span><h2>{slot.time}</h2><p>pm</p></span>
                <p>{slot.date}</p>
        </button>
	);
	

}
export default BookBubble;