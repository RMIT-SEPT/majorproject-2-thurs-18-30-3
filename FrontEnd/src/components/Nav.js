import React from 'react';
import { Link } from 'react-router-dom'

import '../containers/App.css';

function Nav() {
    return (
        <nav>
            <h3>S-E-P-T</h3>
            <u1 className = "nav-links">
                <Link to = "/login">
                    <li>LOGIN</li>
                </Link>
                <Link to="/create">
                    <li>CREATE ACCOUNT</li>
                </Link>
                <Link to="/bookings">
                    <li>BOOKINGS</li>
                </Link>
            </u1>
        </nav>
    );
}

export default Nav;