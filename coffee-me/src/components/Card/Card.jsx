import "./styles.css"
import dunkin from "../../images/dunkin.jpeg"



export const Card = () => {
  return (
    <div className="card-container">
      <div className="card">
        <img id="store-image" src={dunkin} alt="React Image" />
        <div className="card-contents">
            <h1 id="store-name">Dunkin Donuts</h1>
            <h1 id="store-miles">5 Miles</h1>
            <button id="store-details">Details</button>
        </div>
      </div>
    </div>
  );
};
