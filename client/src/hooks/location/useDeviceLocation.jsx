import { useState, useEffect } from "react";

const defaultLocation = {
  loaded: false,
  coordinates: { lat: "", lng: "" },
  address: "",
  error: null,
};

const useDeviceLocation = () => {
  const [location, setLocation] = useState(defaultLocation);

  const onSuccess = (lat, lng) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat,
        lng,
      },
      address: "",
    });
  };

  const onError = (error) => {
    console.log(error);
    setLocation({
      loaded: true,
      error,
    });
  };

  const ipLocationFallback = () => {
    const fetchData = async () => {
      let success = false;

      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data) {
          console.log("Using IP location");
          onSuccess(data.latitude, data.longitude);
          success = true;
        }
      } catch (error) {
        console.log(error);
      }

      if (!success) {
        onError({
          code: 0,
          message: "Location not supported.",
        });
      }
    };
    fetchData();
  };

  const updateLocation = () => {
    console.log("getDeviceLocation called");
    if (!("geolocation" in navigator)) {
      ipLocationFallback();
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSuccess(pos?.coords?.latitude, pos?.coords?.longitude);
      },
      (error) => {
        console.log(error);
        ipLocationFallback();
      }
    );
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
