import "./styles.css";
import { Drawer, Typography, Box, Grid, Stack, Avatar } from "@mui/material";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import { useState } from "react";
import useReviews from "../../hooks/useReviews";

export const ReviewsDrawer = ({ storeId }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data, error } = useReviews(storeId);

  const toRelativeTimeText = (timestamp) => {
    const currentTime = new Date().getTime() / 1000;
    const difference = currentTime - timestamp;
    let output = ``;
    if (difference < 60) {
      // Less than a minute has passed:
      output = `${Math.floor(difference)} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor(difference / 31449600)} years ago`;
    }
    return output;
  };

  if (error) {
    console.log(error);
  }

  return (
    <>
      <div className="review-btn-container">
        <button
          id="reviews-btn"
          onClick={() => setIsDrawerOpen(true)}
          disabled={!data?.length}
        >
          {data?.length ?? 0} Reviews
        </button>
      </div>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div
          className="review-title-container"
          onClick={() => setIsDrawerOpen(false)}
        >
          <h1 id="top-title">Reviews</h1>
        </div>
        <Box
          bgcolor="#D9BBA9"
          overflow="auto"
          height="400px"
          width="100%"
          textAlign="center"
          role="presentation"
        >
          <Typography variant="h6" component="div">
            {data?.length &&
              data.map((review) => (
                <div className="review-container-slider" key={review.timestamp}>
                  <div className="title-container">
                    <Grid container sx={{ ml: "5px" }}>
                      <Grid item xs={2}>
                        <Avatar
                          alt={review.user.username}
                          src={review.user.picture}
                          sx={{ width: 35, height: 35, ml: "15px" }}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <h1 id="review-name">{review.user.username}</h1>
                      </Grid>
                      <Stack direction="row" spacing={1} xs={3}>
                        <p id="review-rating">{review.rating}</p>
                        <FreeBreakfastIcon />
                      </Stack>
                    </Grid>
                    <p id="review-time">
                      {toRelativeTimeText(review.timestamp)}
                    </p>
                  </div>
                  {review.text && (
                    <div className="text-container">
                      <p id="review-text">{review.text}</p>
                    </div>
                  )}
                </div>
              ))}
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default ReviewsDrawer;
