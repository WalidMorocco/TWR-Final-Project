import "./styles.css"
import coffee from "../../images/coffeeIcon.png"
import home from "../../images/home.png"
import {Routes, Route, useNavigate} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import {FaUserCircle} from 'react-icons/fa';

export const Footer= () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  const navigateToProfile = () => {
    navigate('/ProfileSettings');
  };
  const navigateToSellerDashboard = () => {
    navigate('/');
  };
  return (
    <div className="footer-container">
      <div className="top-filters">
        <div className="home-filter">
          <IconContext.Provider value={{ className: "home-icon" }}>
          <button className="filter-1" onClick={navigateToSellerDashboard}><FaHome/></button>
        </IconContext.Provider>
        </div>
      {/* <IconContext.Provider value={{ className: "nav-icon" }}>
        <button id="filter-2" onClick={navigateToHome}><img id="home-icon" src={coffee} alt="React Image" /></button>
      </IconContext.Provider> */}
      <div className="profile-filter">
        <IconContext.Provider value={{ className: "profile-icon" }}>
          <button className="filter-3" onClick={navigateToProfile}><FaUserCircle/></button>
        </IconContext.Provider>
      </div>
      </div>
    </div>
  );
};