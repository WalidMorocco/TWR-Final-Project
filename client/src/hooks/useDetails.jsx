import useFetch from "./crud/useFetch";

const useDetails = (storeId) => {
  let request = `storedetails?storeId=${storeId}`;

  if (localStorage.getItem("token")) {
    request = `user/${request}`;
  }

  console.log(`Fetch ${request}`);
  return useFetch(request);
};

export default useDetails;
