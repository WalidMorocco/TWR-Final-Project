import { useEffect } from "react";
import "./styles.css";

export const Filters = ({ filter, onFilterChange }) => {
  useEffect(() => {
    document.getElementById("filter-1").click();
  }, []);

  return (
    <div className="filter-container">
      <div className="top-filters">
        <button id="filter-1" onClick={() => onFilterChange("aroundyou")}>
          Around You
        </button>
        <button id="filter-2" onClick={() => onFilterChange("drivethru")}>
          Drive Thru
        </button>
        <button id="filter-3" onClick={() => onFilterChange("delivery")}>
          Delivery
        </button>
      </div>
      <div className="bottom-filters">
        <button id="filter-4" onClick={() => onFilterChange("favorites")}>
          Favorites
        </button>
        <button id="filter-5" onClick={() => onFilterChange("bestrated")}>
          Best Rated
        </button>
        <button id="filter-6" onClick={() => onFilterChange("local")}>
          Local
        </button>
      </div>
    </div>
  );
};
