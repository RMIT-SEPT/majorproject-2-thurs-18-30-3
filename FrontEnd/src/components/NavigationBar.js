import React, {useState, useEffect} from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import AuthService from '../services/auth.service'

import '../containers/App.css'

function NavigationBar() {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  return (
    // FIXME: Fix navigation bar style later
    <nav>
      <Navbar bg="white" expand="lg">
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

//Basic Top Navigation Bar
// function NavigationBar() {
//   return (
//     <nav>
//       <h3>S-E-P-T</h3>
//
//       <ul className="nav-links">
//         <Link to="/services" className="big-link">
//           <li>BOOKINGS</li>
//         </Link>
//         <Link to="/services" className="big-link">
//           <li>SERVICES</li>
//         </Link>
//         <Link to="/about" className="big-link">
//           <li>ABOUT</li>
//         </Link>
//         <Link to="/employees" className="big-link">
//           <li>EMPLOYEES</li>
//         </Link>
//
//         <ul className="login-links">
//           <Link to="/login" className="little-link">
//             <li>LOGIN</li>
//           </Link>
//           <Link to="/create" className="little-link">
//             <li>CREATE ACCOUNT</li>
//           </Link>
//         </ul>
//       </ul>
//     </nav>
//   )
// }

export default NavigationBar
