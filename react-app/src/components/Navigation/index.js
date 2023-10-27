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

  const cartButton = () => {
    if (sessionUser) {
      return (
        <NavLink to="/cart" className="cart-button">
          <i class="fa-solid fa-cart-shopping"></i>
        </NavLink>
      );
    }
  };

  return (
    <div className="top-nav">
      <NavLink className="nav-link-logo" to={"/"}>
        <div className="logo-div">
          <h1 className="logo-schrift">TECHSY</h1>
        </div>
      </NavLink>
      <ul className="nav">
        <li className="cart-link">{cartButton()}</li>
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
