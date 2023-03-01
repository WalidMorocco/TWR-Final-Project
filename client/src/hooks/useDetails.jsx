import useFetch from "./useFetch";

const useDetails = (storeId) => {
  let request = `storedetails?storeId=${storeId}`;

  if (localStorage.getItem("token")) {
    request = `user/${request}`;
  }

  return useFetch(request);
};

export default useDetails;
