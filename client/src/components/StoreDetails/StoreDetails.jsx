import "./details_styles.css";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useDetails from "../../hooks/useDetails";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Loading } from "../Loading/Loading";
import { LocationContext } from "../../context/LocationContext";
import { AuthContext } from "../../context/AuthContext";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { Reviews } from "../Reviews/Reviews";
import ReviewsDrawer from "../ReviewsDrawer/ReviewsDrawer";
import { Box, Grid, Rating } from "@mui/material";
import { Stack } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import RateReviewIcon from "@mui/icons-material/RateReview";

const mapsBaseURL = "https://www.google.com/maps/dir/";

const getNavigationURL = (userlocation, storeLocation) => {
  return `${mapsBaseURL}${
    userlocation.location.address
      ? userlocation.location.address
      : "My Location"
  }/@${userlocation.location.lat},${userlocation.location.lng}/${
    storeLocation.address
  }`;
};

export const StoreDetails = () => {
  const { storeId } = useParams();
  const { data, loading, error } = useDetails(storeId);

  const authContext = useContext(AuthContext);
  const locationContext = useContext(LocationContext);

  const [currentModal, setCurrentModal] = useState("");
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

  return (
    <div className="storeDetails-container">
      <div className="slider-image">
        <ImageSlider images={data.images} />
      </div>
      <Stack direction="row">
        <h1 id="details-title" width="80%">
          {data.name}
        </h1>
        <div className="fav-btn">
          {authContext.loggedIn && <FavoriteButton store={data} />}
        </div>
      </Stack>
      <div className="address-container">
        <a
          href={getNavigationURL(locationContext.settings, data.location)}
          id="address"
        >
          {data.location.address}
        </a>
      </div>
      <div className="rate">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="customized-color"
            value={data.rating}
            getLabelText={(value) => `${value} Cup${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<FreeBreakfastIcon fontSize="inherit" />}
            emptyIcon={<FreeBreakfastOutlinedIcon fontSize="inherit" />}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#685618",
              },
            }}
          />
          <Box sx={{ ml: 1 }}>{data.rating}</Box>
        </Box>
      </div>
      <Grid container sx={{ ml: "5%" }}>
        {data.delivery && (
          <Grid item xs={4}>
            <div className="drive-thru-container">
              <div id="check-image">
                <CheckIcon />
              </div>
              <p id="drive-thru">Delivery</p>
            </div>
          </Grid>
        )}
        {data.curbsidePickup && (
          <Grid item xs={8}>
            <div className="drive-thru-container">
              <div id="check-image-2">
                <CheckIcon />
              </div>
              <p id="curbside">Curbside Pickup</p>
            </div>
          </Grid>
        )}
      </Grid>

      <div className="time-container">
        {data.openingHours &&
          data.openingHours.map((hours, i) => (
            <div key={i}>
              <p className="day">{hours}</p>
            </div>
          ))}
      </div>
      <div className="details-container">
        <p id="details-text">
          {data.description ? data.description : "No description available"}
        </p>
      </div>

      <ReviewsDrawer storeId={storeId} />

      {authContext.loggedIn && (
        <button id="reviews-btn2" onClick={() => handleSwitchModal("review")}>
          <RateReviewIcon
            sx={{
              "& .MuiRating-iconFilled": {
                color: "white",
              },
            }}
          />
        </button>
      )}
      {currentModal === "review" && (
        <Reviews
          storeId={storeId}
          storeImage={data.images[0]}
          handleSwitchModal={handleSwitchModal}
          onSave={refreshPage}
        />
      )}
    </div>
  );
};
