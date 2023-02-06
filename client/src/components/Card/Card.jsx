import "./styles.css";
import PropTypes from "prop-types";
import { Photo } from "../Photo";
import usePhoto from "../../hooks/usePhoto";

export const Card = ({ name, distance, photoRef }) => {
  const formatDistance = (distance) => {
    var convDist = distance / 1609;
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
        {photoRef && <Photo photoRef={photoRef} />}
        <div className="card-contents">
          <h1 id="store-name">{name}</h1>
          <h2 id="store-miles">{formatDistance(distance)}</h2>
          <button id="store-details">Details</button>
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
