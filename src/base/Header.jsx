import React from "react";
import "../styles/base/_header.scss";
import logo from "./../assets/images/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const userName = user?.profile?.body?.userName;

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {user ? (
          <>
            <span className="main-nav-item">{userName}</span>
            <a href="/" onClick={handleLogout} className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
