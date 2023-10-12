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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button className="login-submit" onClick={demoUser1}>
          Demo User 1
        </button>
        <button className="login-submit" onClick={demoUser2}>
          Demo User 2
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
