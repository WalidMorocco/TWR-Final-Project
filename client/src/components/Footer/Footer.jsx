import './styles.css';
import { useNavigate } from 'react-router-dom';
import Home from '@mui/icons-material/Home';

export const Footer = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <footer>
      <div className='left-placeholder' />
      <div className='footer-section'>
        <button
          className='footer-button'
          onClick={navigateToHome}
        >
          <Home
            style={{
              color: 'white',
            }}
            fontSize='large'
          />
        </button>
      </div>
      <div className='right-placeholder' />
    </footer>
  );
};
