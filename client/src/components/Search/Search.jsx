import "./styles.css";
import { useState } from "react";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import SearchResult from "./SearchResult";

export const Search = () => {
  const [selection, setSelection] = useState(null);

  return (
      <div className="search-container">
        <GooglePlacesAutocomplete
          autocompletionRequest={{
            types: ["cafe"],
          }}
          selectProps={{
            value: selection,
            placeholder: "Search...",
            onChange: setSelection,
          }}
        />
        {selection && <SearchResult storeId={selection.value?.place_id} />}
      </div>
  );
};

export default Search;