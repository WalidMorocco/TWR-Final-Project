import "./details_styles.css";
import useDetails from "../../hooks/useDetails";
import { useParams } from "react-router-dom";
import ImageSlider from "../ImageSlider/ImageSlider";
import CheckIcon from "@mui/icons-material/Check";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const mapsBaseURL = "https://www.google.com/maps/dir/";

const getNavigationURL = (location) => {
  return `${mapsBaseURL}${location.address}/@${location.lat},${location.lng}`;
};

export const StoreDetails = () => {
  const { storeId } = useParams();
  const { data, loading, error } = useDetails(storeId);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="storeDetails-container">
      <div className="slider-image">
        <ImageSlider images={data.images} />
      </div>
      <div className="detailsTitle-container">
        <h1 id="details-title">{data.name}</h1>
      </div>
      <div className="address-container">
        <a href={getNavigationURL(data.location)} id="address">
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
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#685618",
              },
            }}
          />
          <Box sx={{ ml: 1 }}>{data.rating}</Box>
        </Box>
      </div>
      {data.delivery && (
        <div className="drive-thru-container">
          <div id="check-image">
            <CheckIcon />
          </div>
          <p id="drive-thru">Delivery</p>
        </div>
      )}
      {data.driveThru && (
        <div className="drive-thru-container">
          <div id="check-image">
            <CheckIcon />
          </div>
          <p id="drive-thru">Drive thru</p>
        </div>
      )}
      <div className="time-container">
        {data.openingHours &&
          data.openingHours.map((hours, i) => (
            <div key={i}>
              <p className="day">{hours}</p>
            </div>
          ))}
      </div>
      {}
      <div className="details-container">
        <p id="details-text">
          {data.description ? data.description : "No description available"}
        </p>
      </div>
      <div className="button-container">
        <button id="reviews">Reviews</button>
      </div>
    </div>
  );
};
