import "./styles.css";
import { useNavigate } from "react-router-dom";
import coffeeIcon from "../../images/coffeeIcon.png";
import locationIcon from "../../images/locationIcon.png";
import useLocation from "../../hooks/useLocation";
import { FaPeriscope } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import {FaInfo} from 'react-icons/fa';


export const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToAbout = () => {
    navigate('/AboutUs');
  };
  return (
    <div className="navbar-container">
      <IconContext.Provider value={{ className: "about-icon" }}>
        <div className="navbar-icon">
          <button id="icon-button" onClick={navigateToAbout}><FaInfo/></button>
        </div>
      </IconContext.Provider>
      <div className="navbar-location">
      <IconContext.Provider value={{ className: "loc-icon" }}>
      <FaPeriscope/>
        <h1 id="navbar-location-text">
        {location.coordinates.lat}, {location.coordinates.lng}
        </h1>
      </IconContext.Provider>
      </div>
    </div>
  );
};
