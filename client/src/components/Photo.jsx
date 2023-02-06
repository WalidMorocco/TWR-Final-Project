import PropTypes from "prop-types";
import usePhoto from "../hooks/usePhoto";

export const Photo = ({ photoRef }) => {
  const { data, loading, error } = usePhoto(photoRef);

  console.log(photoRef);

  return (
    <>
      {data && data.photoURL && (
        <img id="store-image" src={data.photoURL} alt="Store Img" />
      )}
    </>
  );
};

Photo.propTypes = {
  photoRef: PropTypes.string.isRequired,
};
