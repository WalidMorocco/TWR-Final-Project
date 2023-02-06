import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        username,
        email,
        password,
      };

      try {
        const res = await axios.post('http://localhost:5000/register', newUser);
        console.log('User registered');
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className='signUp-container'>
      <h1 id='signUp-title'>Sign Up</h1>
      <form
        className='signUp-form'
        onSubmit={handleSubmit}
      >
        <div className='label-title'>
          <label id='email'>Username:</label>
        </div>
        <input
          id='email-input'
          type='text'
          placeholder='Username'
          name='username'
          value={username}
          onChange={handleChange}
          required
        />

        <div className='label-title'>
          <label id='email'>Email:</label>
        </div>
        <input
          id='email-input'
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={handleChange}
          required
        />

        <div className='label-title'>
          <label id='password'>Password:</label>
        </div>
        <input
          id='password-input'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleChange}
          minLength='6'
        />

        <div className='label-title'>
          <label id='confirm-password'>Confirm Password:</label>
        </div>
        <input
          id='confirm-password-input'
          type='password'
          placeholder='Password'
          name='password2'
          value={password2}
          onChange={handleChange}
          minLength='6'
        />
        <div className='submit-button-group'>
          <button
            id='submit'
            type='submit'
            value='Register'
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
