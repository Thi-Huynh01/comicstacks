import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ProfileDropdown.css'

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("access"); // checks for access token

    return (
        <div className='flex flex-col ProfileDropdown'>
            
            {!isLoggedIn ? (
            <ul>
                <Link to="/login">Login</Link>
                <Link to="/register">Create Account</Link>
            </ul>
            ) : (
            <ul>
                <Link>My Account</Link>
                <Link>Settings</Link>
                <Link onClick={() => {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    window.location.reload();
                }}>Logout</Link>
            </ul>
            )}
        </div>
    )
}

export default ProfileDropDown