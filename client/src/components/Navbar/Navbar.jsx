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
