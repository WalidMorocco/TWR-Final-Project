import "./styles.css";
import { useNavigate } from "react-router-dom";
import coffeeIcon from "../../images/coffeeIcon.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";
import LocationModal from "../Location/LocationModal";
import { width } from "@mui/system";
// import useLocation from "../../hooks/useLocation";

export const Navbar = () => {
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState("");

  const navigateToAbout = () => {
    navigate("/AboutUs");
  };

  const handleSwitchModal = (modalName) => {
    setCurrentModal(modalName);
  };

  return (
    // <div className="navbar-container">
    //   <IconContext.Provider value={{ className: "about-icon" }}>
    //     <div className="navbar-icon">
    //       <button id="icon-button" onClick={navigateToAbout}><FaInfo/></button>
    //     </div>
    //   </IconContext.Provider>
    //   <div className="navbar-location">
    //   <IconContext.Provider value={{ className: "loc-icon" }}>
    //   <FaPeriscope/>
    //     <h1 id="navbar-location-text">
    //     {location.coordinates.lat}, {location.coordinates.lng}
    //     </h1>
    //   </IconContext.Provider>
    //   </div>
    // </div>
    <>
      <nav>
        <div className="nav-section">
          <button className="nav-button" onClick={navigateToAbout}>
            <img id="logo-icon" src={coffeeIcon} alt="logo" />
          </button>
        </div>

        <div className="nav-section">
          <button
            className="nav-button"
            onClick={() => handleSwitchModal("location")}
          >
            <LocationOnOutlinedIcon fontSize="large" sx={{ color: "white" }} />
          </button>
        </div>

        <div className="nav-section">
          <button
            className="nav-button"
            onClick={() => handleSwitchModal("signIn")}
          >
            <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
          </button>
        </div>
      </nav>
      {currentModal === "location" && (
        <LocationModal handleSwitchModal={handleSwitchModal} />
      )}
      {currentModal === "signIn" && (
        <SignIn handleSwitchModal={handleSwitchModal} />
      )}
      {currentModal === "signUp" && (
        <SignUp handleSwitchModal={handleSwitchModal} />
      )}
    </>
  );
};
