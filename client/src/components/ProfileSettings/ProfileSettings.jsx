import "./styles.css"

export const ProfileSettings = () => {
  return (
    <div className="profileSettings-container">
        <h1 id="profile-title">Profile Settings</h1>
        <div className="label">
            <label id="name-title">Name:</label>
        </div>
        <input id="name-textbox" type="text" />
        <div className="radius-label">
            <label id="radius-title">Search Radius:</label>
        </div>
        <input id="radius-textbox" type="text" />
        <div className="picture-label">
            <label id="picture-title">Profile Picture:</label>
        </div>
    </div>
  );
};
