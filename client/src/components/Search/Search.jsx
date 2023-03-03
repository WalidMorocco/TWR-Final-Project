import "./styles.css";
import { useState } from "react";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useNearby from "../../hooks/useNearby";
import { useEffect } from "react";
import axios from "axios";
import useDetails from "../../hooks/useDetails";

export const Search = ({ locationSettings }) => {
  const { data } = useNearby(
    locationSettings.location.lat,
    locationSettings.location.lng,
    locationSettings.radius * 1609
  );

  const [value, setValue] = useState(null);
  var variables = {
    name: "",
    address: "",
  };

  var check = false;
  var { StoreName, Address, Rating, hours, open, placeId, number } = "";
  var stores = [];
  var setData = [];

  function refreshPage() {
    window.location.reload(false);
  }

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
  //         "ChIJcWTFjv5K5IkRY6ySbyU1J68" +
  //         `&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`
  //     )
  //     .then((response) =>
  //       console.log("RESPONSE " + JSON.stringify(response.data))
  //     );
  // }, []);

  // number = response.formatted_phone_number;
  // console.log("NUM" + number);

  //  console.log(setData2);

  if (value != null) {
    console.log(value);
    variables = {
      name: value.value.structured_formatting.main_text,
    };
    {
      data &&
        data.results &&
        data.results.length &&
        data.results.map((place) =>
          stores.push({
            place,
          })
        );
    }
    // console.log(stores)
    stores.forEach((el) => {
      //  console.log("i" + el.place.name);
      if (el.place.name === variables.name) {
        check = true;
        StoreName = el.place.name;
        Address = el.place.vicinity;
        Rating = el.place.rating;
        hours = el.place.opening_hours.open_now;
        placeId = el.place.place_id;
        console.log(placeId + "AAAAAA");
        if (hours === true) {
          open = "Open";
        } else {
          open = "Closed";
        }
      }
    });
  }
  if (check === true) {
    return (
      <div className="search-container">
        <GooglePlacesAutocomplete
          selectProps={{
            value,
            placeholder: "Search",
            onChange: setValue,
          }}
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
        />
        <div className="results-container">
          <div className="title-result">
            <h1 id="r-title">{StoreName}</h1>
          </div>
          <div className="hours-result">
            <h3 id="hours">{open}</h3>
          </div>
          <div className="address-result">
            <label htmlFor="Address">
              Address <br />{" "}
            </label>
            <h3 id="a-address">{Address}</h3>
          </div>
          <div className="rating-result">
            <label htmlFor="Rating">
              Rating <br />{" "}
            </label>
            <h3 id="r-rating">{Rating}</h3>
          </div>
          <div className="close-button">
            <button id="close" onClick={refreshPage}>
              Click to reload!
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="search-container">
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          placeholder: "Search...",
          onChange: setValue,
        }}
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      />
      {/* <input id="search-bar" type="text" placeholder="Search..."/> */}
    </div>
  );
};
export default Search;
