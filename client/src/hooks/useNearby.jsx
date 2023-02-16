import useFetch from "./useFetch";

const useNearby = (lat, lon, radius, filter) => {
  return useFetch(`nearbystores/${filter}`, {
    params: {
      lat: lat,
      lon: lon,
      radius: radius,
    },
  });
};

export default useNearby;
