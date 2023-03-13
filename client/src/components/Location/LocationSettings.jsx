import { useState } from 'react';
import Map from '../Map/Map';
import RadiusSlider from '../RadiusSlider/RadiusSlider';
import './styles.css';

const LocationSettings = ({
  settings,
  updateLocation,
  updateRadius,
  onLocationReset,
  handleSwitchModal,
}) => {
  const [currentAddress, setCurrentAddress] = useState(
    settings.location.address ?? ''
  );
  const [currentRadius, setCurrentRadius] = useState(settings.radius);
  const [currentlocation, setCurrentLocation] = useState({
    lat: parseFloat(settings.location.lat),
    lng: parseFloat(settings.location.lng),
  });

  function handleLocationChange(newLocation, newAddress) {
    setCurrentLocation(newLocation);
    setCurrentAddress(newAddress);
  }

  function handleRadiusChange(newRadius) {
    setCurrentRadius(newRadius);
  }

  function handleLocationReset() {
    onLocationReset();
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      settings.location.lat !== currentlocation.lat ||
      settings.location.lng !== currentlocation.lng ||
      settings.location.address !== currentAddress
    ) {
      console.log(currentAddress);
      updateLocation({
        lat: currentlocation.lat,
        lng: currentlocation.lng,
        address: currentAddress,
      });
    }

    if (settings.radius !== currentRadius) {
      updateRadius(currentRadius);
    }

    handleSwitchModal('');
  }

  const containerStyle = {
    width: '100%',
    height: '50%',
  };

  return (
    <div
      className='modal'
      onClick={() => handleSwitchModal('')}
    >
      <div
        className='location-container'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='close-box'>
          <div className='wrap-button'>
            <button
              className='close-button'
              onClick={() => handleSwitchModal('')}
            >
              &times;
            </button>
          </div>
        </div>
        <h1 id='location-title'>Location Settings</h1>
        <Map
          location={{
            lat: currentlocation.lat,
            lng: currentlocation.lng,
            address: currentAddress,
          }}
          isManual={settings.manual}
          radius={currentRadius * 1609}
          zoomLevel={11}
          containerStyle={containerStyle}
          onLocationChanged={handleLocationChange}
          onReset={handleLocationReset}
        />
        <RadiusSlider
          defaultValue={currentRadius}
          onChange={handleRadiusChange}
        />
        <form
          className='location-form'
          onSubmit={handleSubmit}
        >
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

export default LocationSettings;
