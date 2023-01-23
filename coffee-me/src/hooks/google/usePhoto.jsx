import usePlacesAPI from "./usePlacesAPI";

const usePhoto = (photoReference) => {
  return usePlacesAPI(
    "photo",
    `maxwidth=400?photo_reference=${photoReference}`
  );
};

export default usePhoto;
