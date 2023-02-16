import "./styles.css";
import PropTypes from "prop-types";
import usePhoto from "../../hooks/usePhoto";

export const Photo = ({ photoRef, size }) => {
  const { data, loading, error } = usePhoto(photoRef);

  return (
    <>
      {data && data.photoURL && (
        <img
          className={`store-image ${size}`}
          src={data.photoURL}
          alt="Store Img"
        />
      )}
    </>
  );
};

Photo.propTypes = {
  photoRef: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["thumbnail", "full"]).isRequired,
};
