import "./styles.css";
import coffeeIcon from "../../images/coffeeIcon.png";
import locationIcon from "../../images/locationIcon.png";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-icon">
        <img id="icon" src={coffeeIcon} alt="React Image" />
      </div>
      <div className="navbar-location">
        <img id="location-icon" src={locationIcon} alt="React Image" />
        <h1 id="navbar-location-text">194 Main St Ave</h1>
      </div>
    </div>
  );
};
