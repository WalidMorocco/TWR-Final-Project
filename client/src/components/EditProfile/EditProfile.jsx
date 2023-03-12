import "./styles.css";
import { useEffect, useRef, useState, useContext } from "react";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import usePost from "../../hooks/crud/usePost";

export const EditProfile = (props) => {
  const { user, updateUser } = useContext(AuthContext);
  const { postData, responseData, loading, error } = usePost("user/update");

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      let form = new FormData();

      if (fileInput.current.files.length) {
        let file = fileInput.current.files[0];
        form.append("picture", file);
      }

      form.append("username", username);
      form.append("password", password);

      await postData(form);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update user details");
    }
  };

  useEffect(() => {
    if (!loading && responseData) {
      if (responseData.success) {
        updateUser({
          username: responseData.username,
          picture: responseData.picture,
        });
        props.handleSwitchModal("signIn");
      } else {
        setErrorMessage(responseData?.message);
      }
    } else if (error) {
      setErrorMessage("Failed to update user details");
    }
  }, [responseData, error]);

  return (
    <div className="modal" onClick={() => props.handleSwitchModal("")}>
      <div className="edit-container" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label className="label-title">
            Username
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="label-title">
            New Password
            <input
              type="password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="label-title">
            Confirm Password
            <input
              type="password"
              minLength="6"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <label className="label-title">
            Profile Picture
            <input
              type="file"
              ref={fileInput}
              accept="image/jpg,image/jpeg,image/png,image/gif"
            />
          </label>
          {errorMessage && <p id="error">{errorMessage}</p>}
          <div className="submit-button-group">
            <button type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
