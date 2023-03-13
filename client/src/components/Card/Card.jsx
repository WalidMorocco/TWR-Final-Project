import './styles.css';
import PropTypes from 'prop-types';
import { Photo } from '../Photo/Photo';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { CupsRating } from '../Rating/CupsRating';

export const Card = ({
  storeId,
  name,
  distance,
  photoRef,
  filter,
  details,
}) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/StoreDetails/${storeId}`);
  };

  const formatDistance = (distance) => {
    let convDist = distance / 1609;
    if (convDist < 0.1) {
      convDist = (convDist * 5280).toFixed(0);
      return `${convDist} Feet`;
    } else {
      convDist = (Math.round(convDist * 100) / 100).toFixed(2);
      return `${convDist} Miles`;
    }
  };

  return (
    <div className='card-container'>
      <div
        className='card'
        onClick={navigateToDetails}
      >
        {photoRef ? (
          <Photo
            photoRef={photoRef}
            size='thumbnail'
          />
        ) : (
          <img
            className='store-image thumbnail'
            src={`https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com/images/system/default-store.jpg`}
            alt=''
          />
        )}
        <div className='card-contents'>
          <h1 id='store-name'>{name}</h1>
          <h2 id='store-miles'>{formatDistance(distance)}</h2>
          <Grid container>
            <Grid
              item
              xs={9}
            >
              <button
                id='store-details'
                onClick={navigateToDetails}
              >
                Details
              </button>
            </Grid>
            {filter === 'bestrated' && (
              <Grid
                item
                xs={3}
                sx={{ mt: '5px' }}
                justifyContent='start'
              >
                <CupsRating
                  size='compact'
                  theme='light'
                  rating={details?.rating}
                />
              </Grid>
            )}
          </Grid>
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
