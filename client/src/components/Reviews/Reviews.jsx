import "./styles.css";
import dunkin from "../../images/coffeeIcon.png"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";

export const Reviews = () => {
  return (
    <div className="reviews-container">
      <div className="title-container">
        <h1 id="reviews-title">Rate & Review</h1>
      </div>
      <div className="review-image-container">
        <img id="review-images" src={dunkin} alt="React Image" />
      </div>
      <div className="rating-container">
          <div className="rate">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="customized-color"
                // value={data.rating}
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
              {/* <Box sx={{ ml: 1 }}>{data.rating}</Box> */}
            </Box>
        </div>
      </div>
      <div className="lower-container">
        <h2 id="lower-review">Reviews</h2>
      </div>
      <div className="leave-review-container">
        {/* change to input */}
        <input id="review-box"></input>
      </div>
      <div className="button-box">
        <button id="save">Save</button>
      </div>
    </div>
  );
};
