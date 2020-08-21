import React, {useEffect, useState} from 'react'
import {Navbar, Nav} from 'react-bootstrap'

import '../containers/App.css'
import AuthService from '../services/auth.service'

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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ACME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/services">services</Nav.Link>
            <Nav.Link href="/bookings">bookings</Nav.Link>
            <Nav.Link href="/employees">employees</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {currentUser ? (
            <Navbar.Text>
              Signed in as: <a href="#login">{currentUser.username}</a>
            </Navbar.Text>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/create">Create Account</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </nav>
  )
}

export default NavigationBar
