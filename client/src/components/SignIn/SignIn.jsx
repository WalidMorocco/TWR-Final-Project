import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import usePost from "../../hooks/usePost";
import "./styles.css";

export const SignIn = (props) => {
  const authContext = useContext(AuthContext);

  const { postData, responseData, loading } = usePost("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogout = () => {
    authContext.onLogout();
    localStorage.removeItem("token");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postData({
        email,
        password,
      });
    } catch (err) {
      setError(err.response.data.error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && responseData?.token) {
      authContext.onLogin(responseData.user, responseData.token);
      console.log("Logged in successfully!");
    }
  }, [loading]);

  return (
    <div className="modal" onClick={() => props.handleSwitchModal("")}>
      <div className="signIn-container" onClick={(e) => e.stopPropagation()}>
        {authContext.loggedIn ? (
          <div className="logged-container">
            <p>You are logged in!</p>
            <div className="submit-button-group">
              <button id="submit" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 id="signIn-title">Sign In</h1>
            <form className="signIn-form" onSubmit={handleSubmit}>
              <div className="label-title">
                <label id="email">Email:</label>
              </div>
              <input
                id="email-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="label-title">
                <label id="password">Password:</label>
              </div>
              <input
                id="password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div id="error">{error}</div>}
              <div className="sign-up-now">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleSwitchModal("signUp");
                  }}
                >
                  Not a user? Sign up now!
                </button>
              </div>
              <div className="submit-button-group">
                <button type="submit" id="submit">
                  Sign In
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
