import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      console.log('Logged in successfully!');
    } catch (err) {
      setError(err.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className='modal'>
      <div className='signIn-container'>
        {isLoggedIn ? (
          <div className='logged-container'>
            <p>You are logged in!</p>
            <div className='submit-button-group'>
              <button
                id='submit'
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <>
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
              {error && <div>{error}</div>}
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
          </>
        )}
      </div>
    </div>
  );
};
