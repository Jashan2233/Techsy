import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      {user ? ( // If user is logged in
        <div className="user-info-container">
          <button
            className="user-icon-button"
            onClick={() => setShowUserInfo(!showUserInfo)}
          >
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      ) : (
        <div className="authentication-container">
          <li className="sign-in-button">
            <OpenModalButton
              buttonText="Sign In"
              onItemClick={() => setShowMenu(false)}
              modalComponent={<LoginFormModal />}
            />
          </li>
          <li className="sign-up-button">
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={() => setShowMenu(false)}
              modalComponent={<SignupFormModal />}
            />
          </li>
        </div>
      )}
      {user &&
        showUserInfo && ( // If user is logged in and showUserInfo is true
          <div className="user-info-container">
            <div className="user-info-dropdown">
              <div className="user-info">
                <p>User: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        )}
    </>
  );
}

export default ProfileButton;
