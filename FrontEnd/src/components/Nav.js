import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'

import '../containers/App.css';
import AuthService from '../services/auth.service'

//Basic Top Navigation Bar
function Nav() {
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (user) {
        setCurrentUser(user)
        }
    }, [])

    return (
        <nav>
            <div className = "logoDiv">
                <h1>AGME</h1>
            </div>

            <u1 className = "nav-links">
                <Link to="/services" className = "big-link">
                    <li>services</li>
                </Link>
                <Link to="/about" className = "big-link">
                    <li>about</li>
                </Link>
                <Link to="/services" className = "big-link">
                    <li>book</li>
                </Link>
                <Link to="/employees" className = "big-link">
                    <li>employees</li>
                </Link>

                <ul className = "login-links">
                {currentUser ? (
                        <li href="#login">{currentUser.username}</li>
                  ) : (
                    <>
                        <Link to = "/login" className = "little-link">
                            <li>login</li>
                        </Link>
                        <Link to="/create" className = "little-link">
                            <li>create account</li>
                        </Link>
                    </>
                  )}
                </ul>
            </u1>
        </nav>
    );
}

export default Nav;