import React, { useState } from "react";
import {
  LoadScript,
  GoogleMap,
  Circle,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Grid } from "@mui/material";

const libs = ["places"];

const Map = ({
  location,
  radius,
  zoomLevel,
  containerStyle,
  onLocationChanged,
  onReset,
  isManual,
}) => {
  const [map, setMap] = useState();

  const [searchResult, setSearchResult] = useState("Result: none");
  const [center, setCenter] = useState({
    lat: location.lat,
    lng: location.lng,
  });
  const [address, setAddress] = useState(location.address);
  const [circle, setCircle] = useState();
  const [resetEnabled, setResetEnabled] = useState(isManual);

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;

      const location = place.geometry.location;

      setCenter(location);
      setAddress(name);
      setResetEnabled(true);

      onLocationChanged({ lat: location.lat(), lng: location.lng() }, name);
    } else {
      alert("Please enter text");
    }
  }

  return (
    //<LoadScript libraries={libs}>
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoomLevel}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        <Circle
          center={center}
          radius={radius}
          options={{
            strokeColor: "#ff0000",
          }}
          onRadiusChanged={() => map?.fitBounds(circle?.getBounds())}
          onLoad={(circle) => setCircle(circle)}
        />
      </GoogleMap>
      <Stack direction="row" spacing={1}>
        <Grid sx={{ width: "90%" }}>
          <Autocomplete
            onPlaceChanged={onPlaceChanged}
            onLoad={onLoad}
            fields={["name", "geometry", "address_components"]}
          >
            <input
              type="text"
              placeholder={address ? address : "Enter Your Address..."}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `100%`,
                height: `40px`,
                margin: `8% 0`,
                padding: `0 3%`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </Autocomplete>
        </Grid>
        <IconButton
          onClick={() => onReset()}
          disabled={!resetEnabled}
          color="primary"
          aria-label="My location"
          sx={{ width: "10%" }}
        >
          <MyLocationIcon />
        </IconButton>
      </Stack>
    </>
    //</LoadScript>
  );
};

export default Map;
