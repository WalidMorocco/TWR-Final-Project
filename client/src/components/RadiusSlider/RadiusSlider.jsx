import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

export default function RadiusSlider({ defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue);

  const handleSliderChange = (_event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  const marks = [
    {
      value: 1,
      label: "1 mi",
    },
    {
      value: 5,
      label: "5 mi",
    },
    {
      value: 10,
      label: "10 mi",
    },
    {
      value: 15,
      label: "15 mi",
    },
    {
      value: 20,
      label: "20 mi",
    },
  ];

  return (
    <Box>
      <Typography id="input-slider">Search Radius: {value} miles</Typography>
      <Grid container alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof defaultValue === "number" ? defaultValue : 0}
            min={1}
            max={20}
            step={1}
            marks={marks}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            sx={{
              color: "#745246",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
