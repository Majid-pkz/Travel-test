import React from 'react';
import { useState } from 'react'
import { NavLink, Navigate, Link, useNavigate} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css'

import Auth from '../../utils/auth';

const Header = () => {
  const navigate  = useNavigate()
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/")
    // or instead of useNavigate:
    //window.location.href = "/";
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className='logo'>
          <NavLink className="text-light" to="/">
            <img src={Logo} height={150} alt="Logo" />
          </NavLink>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <MenuIcon />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          {Auth.loggedIn() ? (
            <ul>
              <li>
                <NavLink className="home" onClick={handleShowNavbar} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleShowNavbar} to="/create-profile">
                  {/* {Auth.getProfile().data.firstname}'s profile */}
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-trip" onClick={handleShowNavbar}>
                  Start a New Trip
                </NavLink>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
              <ul>
                <li>
                  <NavLink className="home" onClick={handleShowNavbar} to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="login" onClick={handleShowNavbar} to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="signup" onClick={handleShowNavbar} to="/signup">
                    Signup
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
