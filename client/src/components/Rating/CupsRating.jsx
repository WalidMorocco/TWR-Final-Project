import PropTypes from "prop-types";
import { Box, Rating } from "@mui/material";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";

export const CupsRating = ({ size, theme, rating, ratingCount }) => {
  return (
    <>
      {size === "compact" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              mr: "2px",
              mt: "-2px",
              fontSize: "16px",
              color: theme === "dark" ? "black" : "white",
            }}
          >
            {rating}
          </Box>
          <FreeBreakfastIcon
            fontSize="small"
            sx={{ color: theme === "dark" ? "black" : "white" }}
          />
        </Box>
      )}

      {size === "full" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="customized-color"
            value={Number(rating ?? 0)}
            getLabelText={(value) => `${value} Cup${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<FreeBreakfastIcon fontSize="inherit" />}
            emptyIcon={<FreeBreakfastOutlinedIcon fontSize="inherit" />}
            size={size}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: theme === "dark" ? "#685618" : "white",
              },
            }}
          />
          <Box sx={{ ml: 1, color: theme === "dark" ? "black" : "white" }}>
            {rating} {ratingCount && `(${ratingCount})`}
          </Box>
        </Box>
      )}
    </>
  );
};

CupsRating.propTypes = {
  size: PropTypes.oneOf(["compact", "full"]).isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  rating: PropTypes.number,
};
