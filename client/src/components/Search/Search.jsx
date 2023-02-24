import "./styles.css"
import { useState } from "react";
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useNearby from "../../hooks/useNearby";

export const Search = ({ location }) => {
  const { data, loading, error } = useNearby(
    location.coordinates.lat,
    location.coordinates.lng,
    "10000"
  );

  const [value, setValue] = useState(null);
  var variables = {
    name: "",
    address: ""
  };

  var check = false;
  var { StoreName, Address, Rating, hours} = "";
  var stores = [];

  function refreshPage() {
    window.location.reload(false);
  }

  if(value  != null){
    console.log(value);
    variables = {
      name: value.value.structured_formatting.main_text,
    };
    {data &&
      data.results &&
      data.results.length &&
      data.results.map((place) => (
        stores.push({
          place
        })

    ))}
    // console.log(stores)
    stores.forEach((el)=>{
      //  console.log("i" + el.place.name);
      if(el.place.name == variables.name){
        check = true;
        StoreName = el.place.name;
        Address = el.place.vicinity;
      }
    })
  }
  if(check == true){
    return (
      <div className="search-container">
        <GooglePlacesAutocomplete   
            selectProps={{
              value,
              placeholder: 'Search...',
              onChange: setValue,
            }}
            apiKey="AIzaSyBkpSZDQLvioiTKdeakMG3CQTnh5c2U0Rk"
          />
          <div className="results-container">
            <div className="title-result">
              <h1>{StoreName}</h1>
            </div>
            <div className="address-result">
              <a>{Address}</a>
            </div>
            <div>
              <button onClick={refreshPage}>Click to reload!</button>
            </div>
          </div>
      </div>
    )
  }
  return (
    
    <div className="search-container">
        <GooglePlacesAutocomplete   
            selectProps={{
              value,
              placeholder: 'Search...',
              onChange: setValue,
            }}
            apiKey="AIzaSyBkpSZDQLvioiTKdeakMG3CQTnh5c2U0Rk"
          />
      {/* <input id="search-bar" type="text" placeholder="Search..."/> */}
    </div>
    
  );
};
export default Search;