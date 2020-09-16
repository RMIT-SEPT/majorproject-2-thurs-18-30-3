import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'

import '../containers/App.css'
import AuthService from '../services/auth.service'
import ProfilePaneContainer from '../containers/ProfilePaneContainer'
import CurrentUser from '../context/CurrentUser'

//Basic Top Navigation Bar
function Nav() {
  const [currentUser, setCurrentUser] = useContext(CurrentUser)

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [setCurrentUser])

  const modalRef = React.useRef()

  const OpenModal = () => {
    modalRef.current.openModel()
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [setCurrentUser])

  return (
    <nav className="topNav">
      <h1>AGME</h1>

      <ul className="nav-links">
        <Link to="/services" className="big-link">
          <li>services</li>
        </Link>
        <Link to="/about" className="big-link">
          <li>about</li>
        </Link>
        <Link to="/services" className="big-link">
          <li>book</li>
        </Link>
        <Link to="/employees" className="big-link">
          <li>employees</li>
        </Link>

        <ul className="login-links">
          {currentUser ? (
            <>
              <button className="profileButton" onClick={() => OpenModal()} />
              <ProfilePaneContainer showing={false} ref={modalRef}>
                PROFILE
              </ProfilePaneContainer>
            </>
          ) : (
            <>
              <Link to="/login" className="little-link">
                <li>login</li>
              </Link>
              <Link to="/create" className="little-link">
                <li>create</li>
              </Link>
            </>
          )}
        </ul>
      </ul>
    </nav>
  )
}

export default Nav
