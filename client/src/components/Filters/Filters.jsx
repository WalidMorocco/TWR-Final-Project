import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";

export const Filters = ({ filter, onFilterChange }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.getElementById("filter-1").click();
  }, []);

  useEffect(() => {
    if (!authContext.loggedIn && filter === "favorites") {
      document.getElementById("filter-1").click();
    }
  }, [authContext.loggedIn]);

  return (
    <div className="filter-container">
      <div className="top-filters">
        <button id="filter-1" onClick={() => onFilterChange("aroundyou")}>
          Around You
        </button>
        <button id="filter-2" onClick={() => onFilterChange("curbside")}>
          Curbside
        </button>
        <button id="filter-3" onClick={() => onFilterChange("delivery")}>
          Delivery
        </button>
      </div>
      <div className="bottom-filters">
        {authContext.loggedIn && (
          <button id="filter-4" onClick={() => onFilterChange("favorites")}>
            Favorites
          </button>
        )}
        <button id="filter-5" onClick={() => onFilterChange("bestrated")}>
          Best Rated
        </button>
        <button id="filter-6" onClick={() => onFilterChange("coffeeme")}>
          CoffeeMe
        </button>
      </div>
    </div>
  );
};
