import { useState, useEffect } from "react";

const defaultLocation = {
  loaded: false,
  coordinates: { lat: "", lng: "" },
  address: "",
};

const useDeviceLocation = () => {
  const [location, setLocation] = useState(defaultLocation);

  const onSuccess = (location) => {
    console.log(location);
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      address: "",
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };
  const updateLocation = () => {
    console.log("getDeviceLocation called");
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Location not supported.",
      });
    }
    navigator.geolocation.getCurrentPosition((pos) => onSuccess(pos), onError);
  };

  const refresh = () => {
    setLocation((currentLocation) => {
      return {
        loaded: false,
        coordinates: currentLocation.coordinates,
        address: currentLocation.address,
      };
    });
    updateLocation();
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return { refresh, location };
};

export default useDeviceLocation;
