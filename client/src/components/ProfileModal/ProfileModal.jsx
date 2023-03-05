import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './styles.css';

export const ProfileModal = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='container'>
      <div className='imageContainer'>
        <img
          className='image'
          src={user.picture}
          alt='Profile Image'
        />
      </div>
      <div className='userInfo'>
        <label className='label'>Username:</label>
        <p>{user.username}</p>
        <label className='label'>Email:</label>
        <p>{user.email}</p>
      </div>
    </div>
  );
};
