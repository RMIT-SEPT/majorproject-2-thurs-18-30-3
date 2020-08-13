import React from 'react';
import { Link } from 'react-router-dom'

import '../containers/App.css';

function Nav() {
    return (
        <nav>
            <h3>S-E-P-T</h3>

            <ul className = "nav-links">
                <Link to="/bookings" className = "big-link">
                    <li>BOOKINGS</li>
                </Link>
                <Link to="/bookings" className = "big-link">
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
            </ul>
        </nav>
    );
}

export default Nav;