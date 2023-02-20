import useFetch from "./useFetch";

const useNearby = (lat, lng, radius, filter) => {
  return useFetch(`nearbystores/${filter}`, {
    params: {
      lat: lat,
      lng: lng,
      radius: radius,
    },
  });
};

export default useNearby;
