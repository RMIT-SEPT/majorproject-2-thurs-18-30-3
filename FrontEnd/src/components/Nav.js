import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
 
import '../containers/App.css'
import AuthService from '../services/auth.service'
import ProfilePaneContainer from '../containers/ProfilePaneContainer'
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

  //Listener for window size
  useEffect(() => {
      const resizeEvent = () => {
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
      }
  
      window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    }
}, [])

  const modalRef = React.useRef()

  //Function for opening modal profile pane
  const OpenModal = () => {
    modalRef.current.openModel()
  }

  //function for displaying links when button is clicked
  const switchLinkDisplay = () => {
    setShrinkLinks(!isShrinkLinks);
    console.log(isShrinkLinks);
  }

  return (
    <nav className="topNav">
      <h1>AGME</h1>

      {/*the navigation links will render in a toggle list if the screen is small.*/}
      {isShrinkLinks && (<ul className="nav-links">
        <Link to="/about" className="big-link">
          <li>about</li>
        </Link>
        {/* conditionally render activity links */} 
        {true && (
          <>
            <Link to="/services" className="big-link">
              <li>services</li>
            </Link>
            <Link to="/bookings" className="big-link">
              <li>bookings</li>
            </Link>
            <Link to="/employees" className="big-link">
              <li>employees</li>
            </Link>
          </>
        )}

        {/*render profile button only if the user is logged in */}
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
      </ul>)}

      {/* Toggle button visible at small screen sizes */}
      {isToggle && (
        <>
          <div className="toggle-button" onClick={()=>setShrinkLinks(switchLinkDisplay)}>
            <div class="toggle-bar1"/>
            <div class="toggle-bar2"/>
            <div class="toggle-bar3"/>
          </div>
        </>
      )}

    </nav>
  )
}

export default Nav
