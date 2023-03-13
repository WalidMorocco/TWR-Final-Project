import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import './LayoutStyles.css';

const libs = ['places'];

export const Layout = () => {
  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
        libraries={libs}
      >
        <Navbar />
        <div className='outlet-container'>
          <div className='outlet-content'>
            <Outlet />
          </div>
        </div>
        <Footer />
      </LoadScript>
    </div>
  );
};
