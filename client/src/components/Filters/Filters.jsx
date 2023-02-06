import "./styles.css"


export const Filters = () => {
  return (
    <div className="filter-container">
      <div className="top-filters">
        <button id="filter-1">Around You</button>
        <button id="filter-2">Drive Thru</button>
        <button id="filter-3">Delivery</button>
      </div>
      <div className="bottom-filters">
        <button id="filter-4">Favorites</button>
        <button id="filter-5">Best Rated</button>
        <button id="filter-6">Local</button>
      </div>
    </div>
  );
};
