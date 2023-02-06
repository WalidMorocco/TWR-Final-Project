import "./styles.css"
import React from 'react';
import coffeeIcon from "../../images/coffeeIcon.png"
import locationIcon from "../../images/locationIcon.png"
import {Routes, Route, useNavigate} from 'react-router-dom';

export const Navbar = () => {

  const navigate = useNavigate();

  const navigateToAbout = () => {
    navigate('/AboutUs');
  };
  return (
    <div className="navbar-container">
      <div className="navbar-icon">
        <button id="icon-button" onClick={navigateToAbout}><img id="icon" src={coffeeIcon} alt="React Image" /></button> {/** Turn into button **/}
      </div>
      <div className="navbar-location">
        <img id="location-icon" src={locationIcon} alt="React Image" />
        <h1 id="navbar-location-text">194 Main St Ave</h1>
      </div>
    </div>
  );
};
