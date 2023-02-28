// import "./styles.css";
// import { useNavigate } from "react-router-dom";
// import coffeeIcon from "../../images/coffeeIcon.png";
// import locationIcon from "../../images/locationIcon.png";
// import useLocation from "../../hooks/useLocation";
// import { FaPeriscope } from 'react-icons/fa';
// import { IconContext } from "react-icons/lib";
// import {FaInfo} from 'react-icons/fa';

import './styles.css';
import { useNavigate } from 'react-router-dom';
import coffeeIcon from '../../images/coffeeIcon.png';
import locationIcon from '../../images/locationIcon.png';
import userIcon from '../../images/userIcon.png';
import { useState } from 'react';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import LocationModal from '../Location/LocationModal';

export const Navbar = () => {
  const navigate = useNavigate();
  const [currentModal, setCurrentModal] = useState('');

  const navigateToAbout = () => {
    navigate('/AboutUs');
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
        <div className='nav-section'>
          <button
            className='nav-button'
            onClick={navigateToAbout}
          >
            <img
              id='logo-icon'
              src={coffeeIcon}
              alt='logo'
            />
          </button>
        </div>

        <div className='nav-section'>
          <button
            className='nav-button'
            onClick={() => handleSwitchModal('location')}
          >
            <img
              id='location-icon'
              src={locationIcon}
              alt='location'
            />
          </button>
        </div>

        <div className='nav-section'>
          <button
            className='nav-button'
            onClick={() => handleSwitchModal('signIn')}
          >
            <img
              id='user-icon'
              src={userIcon}
              alt='user'
            />
          </button>
        </div>
      </nav>
      {currentModal === 'location' && (
        <LocationModal handleSwitchModal={handleSwitchModal} />
      )}
      {currentModal === 'signIn' && (
        <SignIn handleSwitchModal={handleSwitchModal} />
      )}
      {currentModal === 'signUp' && (
        <SignUp handleSwitchModal={handleSwitchModal} />
      )}
    </>
  );
};
