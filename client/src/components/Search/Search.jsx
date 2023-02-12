import "./styles.css"
import { useState } from "react";
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


export const Search = () => {

  const [value, setValue] = useState(null);
  console.log(value);

  return (
    
    <div className="search-container">
        <GooglePlacesAutocomplete
            selectProps={{
              placeholder: 'Search...',
              value,
              onchange: setValue,
              styles: {
                input: (provided) => ({
                  ...provided,
                  color: 'blue',
                }),
                option: (provided) => ({
                  ...provided,
                  color: 'blue',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'blue',
                }),
              },
            }}
            apiKey="AIzaSyBkpSZDQLvioiTKdeakMG3CQTnh5c2U0Rk"
          />
      {/* <input id="search-bar" type="text" placeholder="Search..."/> */}
    </div>
    
  );
};
export default Search;
