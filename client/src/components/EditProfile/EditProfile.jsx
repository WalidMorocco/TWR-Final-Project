import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './styles.css';

export const EditProfile = (props) => {
  const { user, updateUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  console.log(username);
  console.log(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      let userData = {};
      if (password && username) {
        // If both password and username fields have been updated
        userData = {
          username: username,
          password: password,
        };
      } else if (password) {
        // If only the password field has been updated
        userData = {
          password: password,
        };
      } else if (username) {
        // If only the username field has been updated
        userData = {
          username: username,
        };
      }
      const response = await axios.put(
        `http://localhost:5000/users/${user.id}`,
        {
          username: username,
          password: password,
        }
      );

      if (response.data.success) {
        // Update user info in context
        // updateUser(response.data.user);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }

    console.log(username);
    console.log(password);
  };

  return (
    <div
      className='modal'
      onClick={() => props.handleSwitchModal('')}
    >
      <div
        className='edit-container'
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Edit Profile</h2>
        <form
          className='edit-form'
          onSubmit={handleSubmit}
        >
          <label className='label-title'>
            Username
            <input
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className='label-title'>
            Current Password
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className='label-title'>
            New Password
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <label className='label-title'>
            Profile Picture
            <input
              type='file'
              accept='image/*'
              // onChange={handlePictureChange}
            />
          </label>
          {errorMessage && <p id='error'>{errorMessage}</p>}
          <div className='submit-button-group'>
            <button type='submit'>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};
