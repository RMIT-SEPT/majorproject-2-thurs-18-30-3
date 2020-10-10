import React, {forwardRef, useImperativeHandle} from 'react'
import ReactDOM from 'react-dom'

import ProfilePaneContainer from './ProfilePaneContainer'
import ProfileBookingsContainer from './ProfileBookingsContainer'

const ModalPane = forwardRef((props, ref) => {
    //Is the pane rendering
    const [isShowing, setIsShowing] = React.useState(false);
    const [showBookings, setBookings] = React.useState(false);

    //Refs to the modal operation functions
    useImperativeHandle(ref, () => {
        return {
        openModel: () => open(),
        close: () => close(),
        }
    })

    //open modal pane
    const open = () => {
        setIsShowing(true);
    }

    //close modal pane
    const close = () => {
        setIsShowing(false);
    }

    //switch between profile and bookings view
    const change = () => {
        console.log('change');
        setBookings(!showBookings);
    }
    
    if (isShowing) {
         //Modal components are linked to modal-root node
        if (showBookings){
            return ReactDOM.createPortal(
                <ProfileBookingsContainer change={change}/>,
                document.getElementById('modal-root')
            )
        }
        else{
            return ReactDOM.createPortal(
                <ProfilePaneContainer close={close} change={change} />,
                document.getElementById('modal-root')
            )
        }
    }

    return null
});

export default ModalPane