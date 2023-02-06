import "./styles.css";
import { useNavigate } from "react-router-dom";
import coffeeIcon from "../../images/coffeeIcon.png";
import locationIcon from "../../images/locationIcon.png";
import useLocation from "../../hooks/useLocation";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = () => {
    navigate("/AboutUs", { replace: false });
  };

  return (
    <div className="navbar-container">
      <div className="navbar-icon">
        <img
          id="icon"
          src={coffeeIcon}
          alt="CoffeeMe"
          onClick={handleAboutClick}
        />
      </div>
      <div className="navbar-location">
        <img id="location-icon" src={locationIcon} alt="Location" />
        <h1 id="navbar-location-text">
          {location.coordinates.lat}, {location.coordinates.lng}
        </h1>
      </div>
    </div>
  );
};
