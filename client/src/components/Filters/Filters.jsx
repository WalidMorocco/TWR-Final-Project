import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";

export const Filters = ({ filter, onFilterChange }) => {
  const authContext = useContext(AuthContext);
  const [currentFilter, setCurrentFilter] = useState(filter);

  const handleFilterClick = (newFilter) => {
    setCurrentFilter(newFilter);
    sessionStorage.setItem("lastSetFilter", newFilter);
    onFilterChange(newFilter);
  };

  const getButtonStyle = (filter) => {
    if (filter === currentFilter) {
      return {
        backgroundColor: "#D9BBA9",
        border: "2px solid #745246",
        color: "#745246",
      };
    }
    return {};
  };

  return (
    <div className="filter-container">
      <div className="top-filters">
        <button
          id="filter-1"
          style={getButtonStyle("opennow")}
          onClick={() => handleFilterClick("opennow")}
        >
          Open Now
        </button>
        <button
          id="filter-2"
          style={getButtonStyle("aroundyou")}
          onClick={() => handleFilterClick("aroundyou")}
        >
          Around You
        </button>
        <button
          id="filter-3"
          style={getButtonStyle("bestrated")}
          onClick={() => handleFilterClick("bestrated")}
        >
          Best Rated
        </button>
      </div>
      <div className="bottom-filters">
        <button
          id="filter-4"
          style={getButtonStyle("curbside")}
          onClick={() => handleFilterClick("curbside")}
        >
          Curbside
        </button>
        {authContext.loggedIn && (
          <button
            id="filter-5"
            style={getButtonStyle("favorites")}
            onClick={() => handleFilterClick("favorites")}
          >
            Favorites
          </button>
        )}
        <button
          id="filter-6"
          style={getButtonStyle("delivery")}
          onClick={() => handleFilterClick("delivery")}
        >
          Delivery
        </button>
      </div>
    </div>
  );
};
