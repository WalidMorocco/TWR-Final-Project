import './details_styles.css';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useDetails from '../../hooks/useDetails';
import ImageSlider from '../ImageSlider/ImageSlider';
import { Loading } from '../Loading/Loading';
import { LocationContext } from '../../context/LocationContext';
import { AuthContext } from '../../context/AuthContext';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { Reviews } from '../Reviews/Reviews';
import ReviewsDrawer from '../ReviewsDrawer/ReviewsDrawer';
import { Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { StoreRating } from '../Rating/StoreRating';

const mapsBaseURL = 'https://www.google.com/maps/dir/';

const getNavigationURL = (userlocation, storeLocation) => {
  return `${mapsBaseURL}${
    userlocation.location.address
      ? userlocation.location.address
      : 'My Location'
  }/@${userlocation.location.lat},${userlocation.location.lng}/${
    storeLocation.address
  }`;
};

export const StoreDetails = () => {
  const { storeId } = useParams();
  const { data, loading, error } = useDetails(storeId);

  const authContext = useContext(AuthContext);
  const locationContext = useContext(LocationContext);

  const [currentModal, setCurrentModal] = useState('');
  const handleSwitchModal = (modalName) => {
    setCurrentModal(modalName);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  if (error) {
    console.log(error);
  }

  if (loading || locationContext.loading) {
    return <Loading />;
  }

  const call = () => {
    console.log(data.phone);
    window.location.href = 'tel://' + data.phone;
  };

  return (
    <div className='storeDetails-container'>
      <div className='slider-image'>
        <ImageSlider images={data.images} />
      </div>
      <div className='store-detail'>
        <div className='details-title'>
          <h1>{data.name}</h1>
        </div>
        <div className='fav-btn'>
          {authContext.loggedIn && <FavoriteButton store={data} />}
        </div>
      </div>
      <div className='address-container'>
        <a
          href={getNavigationURL(locationContext.settings, data.location)}
          id='address'
        >
          {data.location.address}
        </a>
      </div>
      <div className='phone'>
        <button
          id='btnCall'
          onClick={call}
        >
          <p>{data.phone}</p>
        </button>
      </div>
      <div className='rate'>
        <StoreRating
          storeId={storeId}
          size='full'
          theme='dark'
        />
      </div>
      <Grid
        container
        sx={{ ml: '5%' }}
      >
        {data.delivery && (
          <Grid
            item
            xs={4}
          >
            <div className='drive-thru-container'>
              <div id='check-image'>
                <CheckIcon />
              </div>
              <p id='drive-thru'>Delivery</p>
            </div>
          </Grid>
        )}
        {data.curbsidePickup && (
          <Grid
            item
            xs={8}
          >
            <div className='drive-thru-container'>
              <div id='check-image-2'>
                <CheckIcon />
              </div>
              <p id='curbside'>Curbside Pickup</p>
            </div>
          </Grid>
        )}
      </Grid>
      <div className='time-container'>
        {data.openingHours &&
          data.openingHours.map((hours, i) => (
            <div key={i}>
              <p className='day'>{hours}</p>
            </div>
          ))}
      </div>
      <div className='details-container'>
        <p id='details-text'>
          {data.description ? data.description : 'No description available'}
        </p>
      </div>
      <div className='review-box'>
        <ReviewsDrawer storeId={storeId} />
        {authContext.loggedIn && (
          <button
            id='reviews-btn2'
            onClick={() => handleSwitchModal('review')}
          >
            <RateReviewIcon
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'white',
                },
              }}
            />
          </button>
        )}
      </div>
      {currentModal === 'review' && (
        <Reviews
          storeId={storeId}
          storeImage={data.images[0]}
          handleSwitchModal={handleSwitchModal}
          onSave={refreshPage}
        />
      )}{' '}
    </div>
  );
};
