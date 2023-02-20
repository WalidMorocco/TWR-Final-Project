import React, { useState } from 'react';
import useLocation from '../../hooks/useLocation';
import './styles.css';

const LocationModal = (props) => {
  const location = useLocation();
  const [address, setAddress] = useState('');
  let latitude;
  let longitude;

  function handleSubmit(event) {
    event.preventDefault();
    const API_KEY = 'AIzaSyBkpSZDQLvioiTKdeakMG3CQTnh5c2U0Rk';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        latitude = data.results[0].geometry.location.lat;
        longitude = data.results[0].geometry.location.lng;
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
        console.log(latitude);
        console.log(longitude);
      });
  }

  return (
    <div
      className='modal'
      onClick={() => props.handleSwitchModal('')}
    >
      <div
        className='location-container'
        onClick={(e) => e.stopPropagation()}
      >
        <h1 id='location-title'>Sign In</h1>
        <form
          className='location-form'
          onSubmit={handleSubmit}
        >
          <div className='label-address'>
            <label>Enter your address:</label>
          </div>
          <input
            id='address-input'
            type='text'
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <div className='submit-button-group'>
            <button
              type='submit'
              id='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationModal;
