import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrors(["Email is required."]);
    } else if (!email.includes("@")) {
      setErrors(["Email is wrong format."]);
    }

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1 className="header">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <ul className="signup-errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="signup-label">Email</label>
          <input
            type="text"
            className="password-input-signup"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="signup-label">Username</label>
          <input
            type="text"
            className="password-input-signup"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="signup-label">Password</label>
          <input
            type="password"
            className="password-input-signup"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="signup-label">Confirm Password</label>
          <input
            type="password"
            className="password-input-signup"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
