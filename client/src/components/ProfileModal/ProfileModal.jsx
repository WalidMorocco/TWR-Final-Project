import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './styles.css'; // Import the CSS file

export const ProfileModal = () => {
  const { user, updatePicture } = useContext(AuthContext);

  return (
    <div className='container'>
      <div className='imageContainer'>
        <img
          className='image'
          src={user.picture}
          alt='Profile'
        />
      </div>
      <button
        className='button'
        onClick={updatePicture}
      >
        Update Picture
      </button>
      <div className='userInfo'>
        <label className='label'>Name:</label>
        <p>{user.username}</p>
        <label className='label'>Email:</label>
        <p>{user.email}</p>
      </div>
    </div>
  );
};
