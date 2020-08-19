import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import '../containers/App.css'
import AuthService from '../services/auth.service'

//Basic Top Navigation Bar
function NavigationBar() {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  return (
    <nav>
      <div className="logoDiv">
        <h1>AGME</h1>
        <h4>company</h4>
      </div>

      <ul className="nav-links">
        <Link to="/services" className="big-link">
          <li>services</li>
        </Link>
        <Link to="/about" className="big-link">
          <li>about</li>
        </Link>
        <Link to="/services" className="big-link">
          <li>bookings</li>
        </Link>
        <Link to="/employees" className="big-link">
          <li>employees</li>
        </Link>

        <ul className="login-links">
          {currentUser ? (
            <Link to={'/profile'} className="nav-link">
              {currentUser.username}
            </Link>
          ) : (
            <>
              <Link to="/login" className="little-link">
                <li>LOGIN</li>
              </Link>
              <Link to="/create" className="little-link">
                <li>CREATE ACCOUNT</li>
              </Link>
            </>
          )}
        </ul>
      </ul>
    </nav>
  )
}

export default NavigationBar
