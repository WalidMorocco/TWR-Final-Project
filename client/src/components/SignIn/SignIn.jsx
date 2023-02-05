import "./styles.css"

export const SignIn = () => {
  return (
    <div className="signIn-container">
        <h1 id="signIn-title">Sign In</h1>
        <form class="signIn-form">
            <div className="label-title">
                <label id="email">Email:</label>
            </div>
            <input id="email-input" type="text" />
            <div className="label-title">
                <label id="password">Password:</label>
            </div>
            <input id="password-input" type="text" />
            <div className="sign-up-now">
                <a href="#">Not a user? Sign up now!</a>
            </div>
            <div className="submit-button-group">
                <button id="submit">Sign In</button>
            </div>
        </form>
    </div>
  );
};
