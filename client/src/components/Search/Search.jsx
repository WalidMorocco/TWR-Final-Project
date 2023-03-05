import "./styles.css";
import { useState } from "react";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useNearby from "../../hooks/useNearby";
import { useEffect } from "react";
import axios from "axios";
import Car from "@mui/icons-material/LocationOnSharp";
import Website from "@mui/icons-material/Info";
import Phone from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";

export const Search = ({ locationSettings }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(null);
  const [res, setRes] = useState(null);
  var variables = {
    name: "",
    address: "",
    rating: "",
    phone: "",
    website: "",
    open:"",
    curbside:"",
    delivery:"",
  };

  var check = false;

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    if(value != null){
      axios
      .get(
        "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
          value.value.place_id +
          `&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`
      )
      .then((response) =>
       
        setRes(response.data)
      );
    }
  }, [value]);

  if (value != null) {
    console.log(value);

    check = true;
    if(res != null){
      console.log(res.result);
      variables={
        name: res.result.name,
        address: res.result.formatted_address,
        rating: res.result.rating,
        phone: res.result.formatted_phone_number,
        website: res.result.website,
        open: res.result.current_opening_hours.open_now,
        curbside: res.result.curbside_pickup,
        delivery: res.result.delivery,

      }
      if(variables.open == false){
        variables.open = "Closed"
      }
      else{
        variables.open = "Open"
      }
      if(variables.curbside == false){
        variables.curbside = "Unavailable"
      }
      else{
        variables.curbside = "Available"
      }
      if(variables.delivery == false){
        variables.delivery = "Unavailable"
      }
      else{
        variables.delivery = "Available"
      }
    }
  }
  if (check == true) {
    const navigateToDetails = () => {
      navigate(`/StoreDetails/${value.value.place_id}`);
    };
    return (
      <div className="search-container">
        <GooglePlacesAutocomplete
          selectProps={{
            value,
            placeholder: "Search",
            onChange: setValue,
          }}
        />
        <div className="results-container">
          <div className="title-result">
            <h1 id="r-title">{variables.name}</h1>
          </div>
          <div className="button-search-group">
            <button id="btnA">
              <Car
              style={{
                color:"white",
                fontSize:"25px",
                marginTop:"1px"
              }}/>
            </button>
            <button id="btnB" onClick={navigateToDetails}>
              <Website 
                style={{
                  color:"white",
                  fontSize:"25px",
                  marginTop:"1px"
                }}/>
            </button>
            <button id="btnC" >
              <Phone 
                style={{
                  color:"white",
                  fontSize:"25px",
                  marginTop:"1px"
                }}/>
            </button>
          </div>
          <div className="open-result">
            <p id="o-open">Hours: {variables.open}</p>
          </div>
          <div className="rating-result">
            <p id="r-rating">Rating: {variables.rating}</p>
          </div>
          <div className="delivery-result">
            <p id="d-delivery">Delivery: {variables.delivery}</p>
          </div>
          <div className="curbside-result">
            <p id="c-curbside">Curbside Pickup: {variables.curbside}</p>
          </div>
          <div className="close-button">
            <button id="close" onClick={refreshPage}>
              Close
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
        minLengthAutocomplete = "6"
      />
    </div>
  );
};
export default Search;
