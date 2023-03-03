import React, { useState } from "react";
import usePost from "../../hooks/usePost";
import "./styles.css";

export const SignUp = (props) => {
  const register = usePost("register");

  const [responseMessage, setResponseMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      try {
        const response = await register.postData(newUser);

        setResponseMessage(response.data.message);
        props.handleSwitchModal("signIn");
      } catch (error) {
        setResponseMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="modal" onClick={() => props.handleSwitchModal("")}>
      <div className="signUp-container" onClick={(e) => e.stopPropagation()}>
        <h1 id="signUp-title">Sign Up</h1>
        <form className="signUp-form" onSubmit={handleSubmit}>
          <div className="label-title">
            <label id="username">Username:</label>
          </div>
          <input
            id="username-input"
            type="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
          <div className="label-title">
            <label id="email">Email:</label>
          </div>
          <input
            id="email-input"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <div className="label-title">
            <label id="password">Password:</label>
          </div>
          <input
            id="password-input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
          />
          <div className="label-title">
            <label id="confirm-password">Confirm Password:</label>
          </div>
          <input
            id="confirm-password-input"
            type="password"
            placeholder="Password"
            name="password2"
            value={password2}
            onChange={handleChange}
            minLength="6"
          />
          {responseMessage && <div>{responseMessage}</div>}
          <div className="submit-button-group">
            <button id="submit" type="submit" value="Register">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
