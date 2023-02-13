import React, { useState } from 'react';
import axios from 'axios';
import './SignInModal.css';

const SignInModal = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // Make a request to your backend to sign the user in
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'user@example.com',
          password: 'password123',
        }),
      });
      const data = await response.json();
      if (data.success) {
        setShowModal(false);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className='modal-wrapper'>
          <div className='modal'>
            <h2>Sign In</h2>
            <form>
              <input
                type='email'
                placeholder='Email'
              />
              <input
                type='password'
                placeholder='Password'
              />
            </form>
            <button
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
