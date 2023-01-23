import usePlacesAPI from "./usePlacesAPI";

const useDetails = (placeId) => {
  return usePlacesAPI("details", `place_id=${placeId}`);
};

export default useDetails;
