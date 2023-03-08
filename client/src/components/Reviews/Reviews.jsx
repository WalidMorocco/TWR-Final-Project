import "./styles.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import usePost from "../../hooks/crud/usePost";
import { useRef, useState } from "react";
import { Photo } from "../Photo/Photo";

export const Reviews = (props) => {
  const [rating, setRating] = useState(0);
  const textRef = useRef("");
  const addReview = usePost("user/addreview");

  const onSave = () => {
    addReview.postData({
      storeId: props.storeId,
      text: textRef.current?.value,
      rating,
      timestamp: (new Date().getTime() / 1000).toFixed(0),
    });

    props.handleSwitchModal("");
    props.onSave();
  };

  return (
    <div className="modal-review" onClick={() => props.handleSwitchModal("")}>
      <div className="reviews-container" onClick={(e) => e.stopPropagation()}>
        <div className="title-container">
          <h1 id="reviews-titles">Rate & Review</h1>
        </div>
        <div className="review-image-container">
          <Photo
            id="review-images"
            photoRef={props.storeImage}
            size="full"
            alt="Store"
          />
        </div>
        <div className="rating-container">
          <div className="rate">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "60%",
                marginLeft: "15%",
                marginTop: "-7px",
              }}
            >
              <Rating
                style={{
                  fontSize: "45px",
                }}
                name="customized-color"
                getLabelText={(value) =>
                  `${value} Cup${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FreeBreakfastIcon fontSize="inherit" />}
                emptyIcon={<FreeBreakfastOutlinedIcon fontSize="inherit" />}
                onChange={(_event, value) => setRating(value)}
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
          <textarea
            id="review-box"
            placeholder="Enter your review..."
            ref={textRef}
          ></textarea>
        </div>
        <div className="button-box">
          <button id="save" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
