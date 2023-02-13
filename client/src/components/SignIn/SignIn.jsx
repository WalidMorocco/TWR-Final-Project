import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      console.log(response.data);
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return (
    <div className='signIn-container'>
      <h1 id='signIn-title'>Sign In</h1>
      <form
        className='signIn-form'
        onSubmit={handleSubmit}
      >
        <div className='label-title'>
          <label id='email'>Email:</label>
        </div>
        <input
          id='email-input'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='label-title'>
          <label id='password'>Password:</label>
        </div>
        <input
          id='password-input'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='sign-up-now'>
          <a href='#'>Not a user? Sign up now!</a>
        </div>
        <div className='submit-button-group'>
          <button
            type='submit'
            id='submit'
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
