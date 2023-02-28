import useFetch from "./useFetch";

const useDetails = (storeId) => {
  return useFetch(`storedetails?storeId=${storeId}`);
};

export default useDetails;
