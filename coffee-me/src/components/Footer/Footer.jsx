import "./styles.css"
import coffee from "/Users/ryan/Documents/School/TWR-Final-Project/coffee-me/src/images/coffeeIcon.png"

export const Footer= () => {
  return (
    <div className="footer-container">
      <div className="top-filters">
        <button id="filter-1"><img id="home-icon" src={coffee} alt="React Image" /></button>
        <button id="filter-2"><img id="home-icon" src={coffee} alt="React Image" /></button>
        <button id="filter-3"><img id="home-icon" src={coffee} alt="React Image" /></button>
      </div>
    </div>
  );
};
