import React, {useContext, useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'

import '../containers/App.css'
import AuthService from '../services/auth.service'
import ModalPane from '../containers/ModalPane'
import CurrentUser from '../context/CurrentUser'
import UserType from '../config/userType'

//Basic Top Navigation Bar
function Nav() {
  const [currentUser, setCurrentUser] = useContext(CurrentUser)
  const [isToggle, setToggle] = useState(false)
  const [isShrinkLinks, setShrinkLinks] = useState(true)

  //Check if user is logged in
  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [setCurrentUser])

  //Determines when nav will modify itself for small screen sizes
  const resizeEvent = useCallback(() => {
    if (window.innerWidth <= 780) {
      setToggle(true)
      setShrinkLinks(false)
    } else {
      setToggle(false)
      setShrinkLinks(true)
    }
  }, [])

  //Listener for window size
  useEffect(() => {
    window.addEventListener('resize', resizeEvent)
    return () => {
      window.removeEventListener('resize', resizeEvent)
    }
  }, [resizeEvent])

  const modalRef = React.useRef()

  //Function for opening modal profile pane
  const OpenModal = () => {
    modalRef.current.openModel()
  }

  //function for displaying links when button is clicked
  const switchLinkDisplay = () => {
    setShrinkLinks(!isShrinkLinks)
  }

  return (
    <nav className="topNav" role="navigation">
      <h1>AGME</h1>

      {/*the navigation links will render in a toggle list if the screen is small.*/}
      {isShrinkLinks && (
        <ul className="nav-links">
          <Link to="/about" className="big-link">
            <li>about</li>
          </Link>
          <Link to="/add" className="big-link">
            <li>add service</li>
          </Link>
          {/* conditionally render activity links */}
          {renderNavItems(currentUser)}

          {/*render profile button only if the user is logged in */}
          <ul className="login-links" role="group">
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
        </ul>
      )}

      {/* Toggle button visible at small screen sizes */}
      {isToggle && (
        <div className="toggle-button" role="button" onClick={() => setShrinkLinks(switchLinkDisplay)}>
          <div className="toggle-bar1" />
          <div className="toggle-bar2" />
          <div className="toggle-bar3" />
        </div>
      )}
    </nav>
  )
}

function renderNavItems(currentUser) {
  if (!currentUser) return

  const {userType} = currentUser

  // conditionally render navigation items
  switch (userType.toLowerCase()) {
    case UserType.Customer:
      return (
        <>
          <Link to="/bookings">bookings</Link>
          <Link to="/services">services</Link>
        </>
      )
    case UserType.Employee:
      return (
        <>
          <Link to="/myservices" className="big-link">
            my services
          </Link>
        </>
      )
    case UserType.Admin:
      return (
        <>
          <Link to="/services" className="big-link">
            services
          </Link>
          <Link to="/employees" className="big-link">
            employees
          </Link>
        </>
      )
    default:
      return (
        <>
          <Link to="/bookings">bookings</Link>
          <Link to="/services">services</Link>
          <Link to="/employees">employees</Link>
        </>
      )
  }
}

export default Nav
