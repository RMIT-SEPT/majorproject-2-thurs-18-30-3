import React, {  } from 'react';
import { Button } from 'reactstrap';

import '../containers/App.css';

//Displays a booking slot

function BookBubble({ slot }) {
	return (
        <Button className="book-bubble">
            <span><h2>{slot.time}</h2><p>pm</p></span>
                <p>{slot.date}</p>
        </Button>
	);
	

}
export default BookBubble;