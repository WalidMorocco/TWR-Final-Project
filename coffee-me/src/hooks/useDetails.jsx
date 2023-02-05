import useFetch from "./useFetch";

const useDetails = (placeId) => {
  return useFetch("storedetails", {
    params: {
      id: placeId,
    },
  });
};

export default useDetails;
