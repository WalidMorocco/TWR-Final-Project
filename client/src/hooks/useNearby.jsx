import useFetch from "./useFetch";

const useNearby = (lat, lng, radius, filter) => {
  return useFetch(
    `nearbystores/${filter}?lat=${lat}&lng=${lng}&radius=${radius}`
  );
};

export default useNearby;
