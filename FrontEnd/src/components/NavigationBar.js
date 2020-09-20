import React, {useContext} from 'react'
import {Navbar, Nav} from 'react-bootstrap'

import '../containers/App.css'
import ProfilePaneContainer from '../containers/ProfilePaneContainer'
import CurrentUser from '../context/CurrentUser'
import UserType from '../config/userType'

function NavigationBar() {
  const [currentUser] = useContext(CurrentUser)

  const modalRef = React.useRef()

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
            {renderNavItems(currentUser)}

            <Nav.Link href="/about">about</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {currentUser ? (
            <>
              <button className="profileButton" onClick={() => OpenModal()} />
              <ProfilePaneContainer showing={false} ref={modalRef}>
                PROFILE
              </ProfilePaneContainer>
            </>
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

function renderNavItems(currentUser) {
  if (!currentUser) return

  const {type} = currentUser

  // conditionally render navigation items
  switch (type.toLowerCase()) {
    case UserType.Customer:
      return (
        <>
          <Nav.Link href="/bookings">bookings</Nav.Link>
          <Nav.Link href="/services">services</Nav.Link>
        </>
      )
    case UserType.Employee:
      return <></>
    default:
      return (
        <>
          <Nav.Link href="/bookings">bookings</Nav.Link>
          <Nav.Link href="/services">services</Nav.Link>
          <Nav.Link href="/employees">employees</Nav.Link>
        </>
      )
  }
}

export default NavigationBar
