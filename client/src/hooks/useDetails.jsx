import useFetch from "./useFetch";

const useDetails = (storeId) => {
  return useFetch("storedetails", {
    params: {
      storeId: storeId,
    },
  });
};

export default useDetails;
