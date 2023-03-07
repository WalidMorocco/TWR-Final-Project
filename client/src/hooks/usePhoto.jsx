import useFetch from "./crud/useFetch";

const usePhoto = (photoReference) => {
  return useFetch(`storephoto?photoRef=${photoReference}`);
};

export default usePhoto;
