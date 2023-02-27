import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const ProfileModal = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <div className='modal'>
      {user ? (
        <>
          <h2>Profile</h2>
          <div className='profile'>
            <img
              src={user.avatar}
              alt={user.name}
            />
            <div className='info'>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              {/* Add more user information as needed */}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileModal;
