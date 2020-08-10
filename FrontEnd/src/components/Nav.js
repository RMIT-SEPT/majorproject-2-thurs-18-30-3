import React from 'react';
import { NavLink } from 'react-router-dom'

import '../containers/App.css';

function Nav() {
    return (
        <nav>
            <h3>S-E-P-T</h3>
            <u1 className = "nav-links">
                <NavLink to="/bookings">
                    <li>BOOKINGS</li>
                </NavLink>
                <NavLink to="/about">
                    <li>ABOUT</li>
                </NavLink>
            
                <u2 className = "login-links">
                    <NavLink to = "/login">
                        <li>LOGIN</li>
                    </NavLink>
                    <NavLink to="/create">
                        <li>CREATE ACCOUNT</li>
                    </NavLink>
                </u2>
            </u1>
        </nav>
    );
}

export default Nav;