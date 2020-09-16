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

  const modalRef = React.useRef();
	
	const OpenModal = () => {
		modalRef.current.openModel()
	}

  return (
    <nav>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand href="#home">ACME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">about</Nav.Link>

              {/* conditionally render activity links */} 
              {currentUser ? (
                <>
                <Nav.Link href="/services">services</Nav.Link>
                <Nav.Link href="/bookings">bookings</Nav.Link>
                <Nav.Link href="/employees">employees</Nav.Link>
              </>
              ) : (
                console.log(currentUser)
              )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        
          {currentUser ? (
            <button className = "profileButton" onClick = {() => OpenModal()}/>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/create">Create Account</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      <ProfilePaneContainer showing={false} ref = {modalRef}>PROFILE</ProfilePaneContainer>
    </nav>
  )
}

export default NavigationBar
