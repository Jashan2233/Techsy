import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user ? (
        <>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default ProfileButton;
