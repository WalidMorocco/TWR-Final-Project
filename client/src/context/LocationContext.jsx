import { useState, useEffect, createContext } from "react";
import useDeviceLocation from "../hooks/location/useDeviceLocation";

const defaultLocation = {
  lat: "",
  lng: "",
  address: "",
};

export const LocationContext = createContext({
  settings: {
    location: defaultLocation,
    radius: 5,
    manual: false,
  },
  setCurrentLocation: (_location) => {},
  setCurrentRadius: (_radius) => {},
  resetLocation: () => {},
  loading: true,
});

export const LocationProvider = ({ children }) => {
  const { location, refresh } = useDeviceLocation();
  const [locationSettings, setLocationSettings] = useState(
    JSON.parse(localStorage.getItem("locationSettings")) ?? {
      location: {
        lat: location?.coordinates?.lat,
        lng: location?.coordinates?.lng,
        address: location.address,
      },
      radius: 5,
      manual: false,
    }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.loaded) {
      if (!locationSettings?.manual) {
        setLocationSettings((currentSettings) => {
          return {
            location: {
              lat: location.coordinates.lat,
              lng: location.coordinates.lng,
              address: location.address,
            },
            radius: currentSettings?.radius ?? 5,
            manual: false,
          };
        });
      }
      setLoading(false);
    }
  }, [location.loaded]);

  useEffect(() => {
    localStorage.setItem("locationSettings", JSON.stringify(locationSettings));
  }, [locationSettings]);

  const setCurrentLocation = (location) => {
    console.log(location);
    setLocationSettings((currentSettings) => {
      return {
        location: location,
        radius: currentSettings.radius,
        manual: true,
      };
    });
  };

  const setCurrentRadius = (radius) => {
    setLocationSettings((currentSettings) => {
      return {
        location: currentSettings.location,
        radius: radius,
        manual: currentSettings.manual,
      };
    });
  };

  const resetLocation = () => {
    setLocationSettings((currentSettings) => {
      return {
        location: defaultLocation,
        radius: currentSettings.radius,
        manual: false,
      };
    });

    setLoading(true);
    refresh();
  };

  return (
    <LocationContext.Provider
      value={{
        settings: locationSettings,
        setCurrentLocation: setCurrentLocation,
        setCurrentRadius: setCurrentRadius,
        resetLocation: resetLocation,
        loading: loading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
