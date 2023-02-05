import "./styles.css"

export const SignUp = () => {
  return (
    <div className="signUp-container">
        <h1 id="signUp-title">Sign Up</h1>
        <form class="signUp-form">
            <div className="label-title">
                <label id="email">Email:</label>
            </div>
            <input id="email-input" type="text" />
            <div className="label-title">
                <label id="password">Password:</label>
            </div>
            <input id="password-input" type="text" />
            <div className="label-title">
                <label id="confirm-password">Confirm Password:</label>
            </div>
            <input id="confirm-password-input" type="text" />
            <div className="submit-button-group">
                <button id="submit">Register</button>
            </div>
        </form>
    </div>
  );
};
