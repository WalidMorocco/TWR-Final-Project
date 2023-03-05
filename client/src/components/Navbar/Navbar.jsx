import './styles.css';
import { useNavigate } from 'react-router-dom';
import coffeeIcon from '../../images/coffeeIcon.png';
import { useState } from 'react';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import LocationModal from '../Location/LocationModal';
import { EditProfile } from '../EditProfile/EditProfile';
import Profile from '@mui/icons-material/AccountCircle';
import Location from '@mui/icons-material/LocationOnSharp';

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
            <Location
              fontSize='large'
              style={{ color: 'white' }}
            />
          </button>
        </div>

        <div className='nav-section'>
          <button
            className='nav-button'
            onClick={() => handleSwitchModal('signIn')}
          >
            <Profile
              fontSize='large'
              style={{ color: 'white' }}
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
      {currentModal === 'editProfile' && (
        <EditProfile handleSwitchModal={handleSwitchModal} />
      )}
    </>
  );
};
