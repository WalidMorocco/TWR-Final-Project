import "./styles.css";
import PropTypes from "prop-types";
import usePhoto from "../../hooks/usePhoto";
import { Loading } from "../Loading/Loading";

export const Photo = ({ photoRef, size }) => {
  const { data, loading, error } = usePhoto(photoRef);

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <Loading />;
  }

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
