import React from 'react';
import { Link } from 'react-router-dom'

import '../containers/App.css';

//Basic Top Navigation Bar

function Nav() {
    return (
        <nav>
            <h3>S-E-P-T</h3>

            <u1 className = "nav-links">
                <Link to="/services" className = "big-link">
                    <li>BOOKINGS</li>
                </Link>
                <Link to="/services" className = "big-link">
                    <li>SERVICES</li>
                </Link>
                <Link to="/about" className = "big-link">
                    <li>ABOUT</li>
                </Link>
                <Link to="/employees" className = "big-link">
                    <li>EMPLOYEES</li>
                </Link>

                <ul className = "login-links">
                    <Link to = "/login" className = "little-link">
                        <li>LOGIN</li>
                    </Link>
                    <Link to="/create" className = "little-link">
                        <li>CREATE ACCOUNT</li>
                    </Link>
                </ul>
            </u1>
        </nav>
    );
}

export default Nav;