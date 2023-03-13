import "./styles.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import usePost from "../../hooks/crud/usePost";
import { useRef, useState } from "react";

export const Reviews = (props) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [rating, setRating] = useState(0);
  const textRef = useRef("");
  const addReview = usePost("user/addreview");

  const onSave = () => {
    if (rating > 0) {
      addReview.postData({
        storeId: props.storeId,
        text: textRef.current?.value,
        rating,
        timestamp: (new Date().getTime() / 1000).toFixed(0),
      });

      props.handleSwitchModal("");
      props.onSave();
    } else {
      setResponseMessage("Please select a rating between 1-5 cups");
    }
  };

  return (
    <div className="modal-review" onClick={() => props.handleSwitchModal("")}>
      <div className="reviews-container" onClick={(e) => e.stopPropagation()}>
        <div className="close-box">
          <div className="wrap-button">
            <button
              className="close-button"
              onClick={() => props.handleSwitchModal("")}
            >
              &times;
            </button>
          </div>
        </div>
        <div className="rate-review-container">
          <h1 id="reviews-titles">Rate & Review</h1>
        </div>
        <div className="rating-container">
          <div className="rate-input">
            <Box>
              <Rating
                name="customized-color"
                getLabelText={(value) =>
                  `${value} Cup${value !== 1 ? "s" : ""}`
                }
                precision={1}
                icon={<FreeBreakfastIcon fontSize="inherit" />}
                emptyIcon={<FreeBreakfastOutlinedIcon fontSize="inherit" />}
                onChange={(_event, value) => setRating(value)}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#685618",
                  },
                }}
              />
            </Box>
          </div>
        </div>
        <div className="lower-container">
          <h2 id="lower-review">Review</h2>
        </div>
        <div className="leave-review-container">
          <textarea
            id="review-box"
            placeholder="Enter your review..."
            ref={textRef}
          ></textarea>
        </div>
        {responseMessage && (
          <p style={{ color: "maroon" }}>{responseMessage}</p>
        )}
        <div className="button-box">
          <button id="save" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
