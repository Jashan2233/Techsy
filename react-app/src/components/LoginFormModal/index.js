import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const demoUser1 = async () => {
    const email = "demo@aa.io";
    const password = "password";
    const demoData = await dispatch(login(email, password));
    if (!demoData) {
      closeModal();
    }
  };

  const demoUser2 = async () => {
    const email = "marnie@aa.io";
    const password = "password";
    const demoData = await dispatch(login(email, password));
    if (!demoData) {
      closeModal();
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Sign in Tech-Fan!</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <ul className="login-errors">
          {errors.map((error, idx) => (
            <li key={idx} className="login-error">
              {error}
            </li>
          ))}
        </ul>
        <label className="login-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
        </label>
        <label className="login-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="password-input"
          />
        </label>
        <button type="submit" className="login-button">
          Log In
        </button>
        <button type="button" className="login-submit" onClick={demoUser1}>
          Demo User 1
        </button>
        <button type="button" className="login-submit" onClick={demoUser2}>
          Demo User 2
        </button>
      </form>
      <a href={"http://localhost:5000/oauth_login"}>
        <button>OAUTH</button>
      </a>
    </div>
  );
}

export default LoginFormModal;
