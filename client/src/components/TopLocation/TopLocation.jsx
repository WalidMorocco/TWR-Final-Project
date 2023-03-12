import "./styles.css";

export const TopLocation = ({ locationSettings }) => {
  return (
    <div className="topLocation-container">
      <p id="top-location">
        Around{" "}
        {locationSettings.manual
          ? locationSettings.location.address
          : "Current Location"}
      </p>
    </div>
  );
};
