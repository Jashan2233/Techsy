import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

// Shop Button

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const shopButton = () => {
    if (sessionUser) {
      return (
        <NavLink
          to="/shops/current"
          className="store-button"
          data-tooltip="Shop Manager"
        >
          <i className="fa-solid fa-store"></i>
        </NavLink>
      );
    }
  };

  return (
    <div className="top-nav">
      <div className="logo-div">
        <h1 className="logo-schrift">TECHSY</h1>
      </div>
      <ul className="nav">
        <li className="shop-link"> {shopButton()}</li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
