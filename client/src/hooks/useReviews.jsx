import useFetch from "./crud/useFetch";

const useReviews = (storeId) => {
  let request = `storereviews?storeId=${storeId}`;

  console.log(`Fetch ${request}`);
  return useFetch(request);
};

export default useReviews;
