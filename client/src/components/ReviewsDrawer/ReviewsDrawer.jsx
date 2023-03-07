import { Drawer, Typography, Box } from "@mui/material";
import { useState } from "react";
import useReviews from "../../hooks/useReviews";

export const ReviewsDrawer = ({ storeId }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data, error } = useReviews(storeId);

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
        <div className="review-title-container">
          <h1 id="top-title">Reviews</h1>
        </div>
        <Box
          p={2}
          bgcolor="#D9BBA9"
          overflow="auto"
          height="400px"
          width="358px"
          textAlign="center"
          role="presentation"
        >
          <Typography variant="h6" component="div">
            {data?.length &&
              data.map((review) => (
                <div className="review-container-slider" key={review.timestamp}>
                  <div className="title-container">
                    <h1 id="review-name">{review.user.username}</h1>
                    <h3 id="review-rating">{review.rating}</h3>
                  </div>
                  <div className="text-container">
                    <p id="review-text">{review.text}</p>
                  </div>
                </div>
              ))}
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default ReviewsDrawer;
