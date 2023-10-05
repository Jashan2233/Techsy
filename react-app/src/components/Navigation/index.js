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
          <i className="fa-solid fa-store" id="shop-icon"></i>
        </NavLink>
      );
    }
  };

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li> {shopButton()}</li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
