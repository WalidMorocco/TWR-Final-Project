import useFetch from "./useFetch";

const usePhoto = (photoReference) => {
  return useFetch("storephoto", {
    params: {
      photoRef: photoReference,
    },
  });
};

export default usePhoto;
