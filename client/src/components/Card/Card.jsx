import "./styles.css";
import PropTypes from "prop-types";
import usePhoto from "../../hooks/usePhoto";
import {Routes, Route, useNavigate} from 'react-router-dom';

export const Card = ({ name, distance, photoRef }) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate('/StoreDetails');
  };

  const { data, loading, error } = usePhoto(photoRef);

  var formattedDistance;
  console.log(photoRef);
  var convDist = distance / 1609;
  if (convDist < 1) {
    convDist = (convDist * 5280).toFixed(0);
    formattedDistance = `${convDist} Feet`;
  } else {
    convDist = (Math.round(convDist * 100) / 100).toFixed(2);
    formattedDistance = `${convDist} Miles`;
  }

  return (
    <div className="card-container">
      <div className="card">
        {data && <img id="store-image" src={data.photoURL} alt="Store Img" />}
        <div className="card-contents">
          <h1 id="store-name">{name}</h1>
          <h2 id="store-miles">{formattedDistance}</h2>
            <button id="store-details" onClick={navigateToDetails}>Details</button>
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
