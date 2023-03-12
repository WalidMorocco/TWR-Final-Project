import useFetch from "./crud/useFetch";

const useNearby = (lat, lng, radius, filter) => {
  let request = `nearbystores/${filter}?lat=${lat}&lng=${lng}&radius=${radius}`;

  if (localStorage.getItem("token")) {
    request = `user/${request}`;
  }

  console.log(`Fetch ${request}`);
  return useFetch(request);
};

export default useNearby;
