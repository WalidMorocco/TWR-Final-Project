import { useState, useEffect } from "react";

const useIPLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      console.log(data);
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    };
    fetchData();
  }, []);

  return location;
};

export default useIPLocation;
