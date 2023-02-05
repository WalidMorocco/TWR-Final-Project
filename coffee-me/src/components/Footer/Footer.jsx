import "./styles.css"
import coffee from "../../images/coffeeIcon.png"
import {Routes, Route, useNavigate} from 'react-router-dom';

export const Footer= () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  const navigateToProfile = () => {
    navigate('/ProfileSettingsPage');
  };
  const navigateToSellerDashboard = () => {
    navigate('/');
  };
  return (
    <div className="footer-container">
      <div className="top-filters">
        <button id="filter-1" onClick={navigateToSellerDashboard}><img id="home-icon" src={coffee} alt="React Image" /></button>
        <button id="filter-2" onClick={navigateToHome}><img id="home-icon" src={coffee} alt="React Image" /></button>
        <button id="filter-3" onClick={navigateToProfile}><img id="home-icon" src={coffee} alt="React Image" /></button>
      </div>
    </div>
  );
};
