import useFetch from "./useFetch";

const useNearby = (lat, lon, radius = "50000") => {
  return useFetch("nearbystores", {
    params: {
      lat: lat,
      lon: lon,
      radius: radius,
    },
  });
};

export default useNearby;
