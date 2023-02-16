import "./styles.css";
import PropTypes from "prop-types";
import defaultStoreIcon from "../../images/coffeeIcon.png";
import { Photo } from "../Photo/Photo";
import { useNavigate } from "react-router-dom";

export const Card = ({ storeId, name, distance, photoRef }) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/StoreDetails/${storeId}`);
  };

  const formatDistance = (distance) => {
    let convDist = distance / 1609;
    if (convDist < 1) {
      convDist = (convDist * 5280).toFixed(0);
      return `${convDist} Feet`;
    } else {
      convDist = (Math.round(convDist * 100) / 100).toFixed(2);
      return `${convDist} Miles`;
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        {photoRef ? (
          <Photo photoRef={photoRef} size="thumbnail" />
        ) : (
          <img
            className="store-image thumbnail"
            src={defaultStoreIcon}
            alt="Store Img"
          />
        )}
        <div className="card-contents">
          <h1 id="store-name">{name}</h1>
          <h2 id="store-miles">{formatDistance(distance)}</h2>
          <button id="store-details" onClick={navigateToDetails}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  photoRef: PropTypes.string,
};
