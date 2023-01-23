import usePlacesAPI from "./usePlacesAPI";

const useNearby = (lat, lon, radius = "50000") => {
  return usePlacesAPI(
    "nearbysearch",
    `location=${lat},${lon}&radius=${radius}&type=cafe`
  );
};

export default useNearby;
