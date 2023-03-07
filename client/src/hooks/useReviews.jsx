import useFetch from "./crud/useFetch";

const useReviews = (storeId) => {
  let request = `storereviews?storeId=${storeId}`;

  return useFetch(request);
};

export default useReviews;
