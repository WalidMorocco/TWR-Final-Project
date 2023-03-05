import "./styles.css";
import dunkin from "../../images/dunks.jpeg"
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";

export const Reviews = (props) => {
  return (
    <div className="modal-review" onClick={() => props.handleSwitchModal("")}>
      <div className="reviews-container" onClick={(e) => e.stopPropagation()}>
        <div className="title-container">
          <h1 id="reviews-titles">Rate & Review</h1>
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
                  width:"60%",
                  marginLeft:"15%",
                  marginTop:"-7px"
                }}
              >
                <Rating
                  style={{
                    fontSize: "45px"
                  }}
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
          <h2 id="lower-review">Review</h2>
        </div>
        <div className="leave-review-container">
          <textarea id="review-box" placeholder="Leave a Review!"></textarea>
        </div>
        <div className="button-box">
          <button id="save">Save</button>
        </div>
      </div>
    </div>
  );
};
