import React, {useEffect, useCallback } from 'react'
import {Link} from 'react-router-dom'
 
import '../containers/App.css'
import AuthService from '../services/auth.service'
import ModalPane from '../containers/ModalPane'
import CurrentUser from '../context/CurrentUser'

//Basic Top Navigation Bar
function Nav() {
  const [currentUser, setCurrentUser] = React.useContext(CurrentUser);
  const [isToggle, setToggle] = React.useState(false);
  const [isShrinkLinks, setShrinkLinks] = React.useState(true);

  //Check if user is logged in
  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [setCurrentUser])

  //Determines when nav will modify itself for small screen sizes
  const resizeEvent =  useCallback(() => {
    if(window.innerWidth <= 780)
    {
      setToggle(true);
      setShrinkLinks(false);
    }
    else
    {
      setToggle(false);
      setShrinkLinks(true);
    }
  }, [])

  //Listener for window size
  useEffect(() => {
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    }
  }, [resizeEvent])


  const modalRef = React.useRef()

  //Function for opening modal profile pane
  const OpenModal = () => {
    modalRef.current.openModel()
  }

  //function for displaying links when button is clicked
  const switchLinkDisplay = () => {
    setShrinkLinks(!isShrinkLinks);
  }

  return (
    <nav className="topNav" role="navigation">
      <h1>AGME</h1>

      {/*the navigation links will render in a toggle list if the screen is small.*/}
      {isShrinkLinks && (<ul className="nav-links">
        <Link to="/about" className="big-link">
          <li>about</li>
        </Link>
        <Link to="/add" className="big-link">
          <li>add service</li>
        </Link>
        <Link to="/services" className="big-link">
          <li>services</li>
        </Link>
        {/* conditionally render activity links */} 
        {currentUser && (
          <>
            <Link to="/bookings" className="big-link">
              <li>bookings</li>
            </Link>
            <Link to="/employees" className="big-link">
              <li>employees</li>
            </Link>
          </>
        )}

        {/*render profile button only if the user is logged in */}
        <ul className="login-links" role = 'group'>
          {currentUser ? (
            <>
              <button className="profileButton" onClick={() => OpenModal()} />
              <ModalPane showing={false} ref={modalRef}>
                PROFILE
              </ModalPane>
            </>
          ) : (
            <>
              <Link to="/login" className="little-link">
                <li>login</li>
              </Link>
              <Link to="/create" className="little-link">
                <li>create account</li>
              </Link>
            </>
          )}
        </ul>
      </ul>)}

      {/* Toggle button visible at small screen sizes */}
      {isToggle && (
          <div className="toggle-button" role="button" onClick={()=>setShrinkLinks(switchLinkDisplay)}>
            <div class="toggle-bar1"/>
            <div class="toggle-bar2"/>
            <div class="toggle-bar3"/>
          </div>
      )}

    </nav>
  )
}

export default Nav
