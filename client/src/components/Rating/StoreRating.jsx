import useFetch from "../../hooks/crud/useFetch";
import { Box, Rating } from "@mui/material";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";

export const StoreRating = ({ storeId }) => {
  const { data } = useFetch(`storerating?storeId=${storeId}`);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="customized-color"
        value={Number(data?.rating ?? 0)}
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
      <Box sx={{ ml: 1 }}>{data?.rating}</Box>
    </Box>
  );
};
