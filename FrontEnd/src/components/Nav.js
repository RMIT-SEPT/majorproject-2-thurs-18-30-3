import React from 'react';
import { Link } from 'react-router-dom'

import '../containers/App.css';

//Basic Top Navigation Bar
function Nav() {
    return (
        <nav>
            <div className = "logoDiv">
                <h1>AGME</h1>
                <h4>company</h4>
            </div>

            <u1 className = "nav-links">
                <Link to="/services" className = "big-link">
                    <li>services</li>
                </Link>
                <Link to="/about" className = "big-link">
                    <li>about</li>
                </Link>
                <Link to="/services" className = "big-link">
                    <li>bookings</li>
                </Link>
                <Link to="/employees" className = "big-link">
                    <li>employees</li>
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