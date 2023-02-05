import "./styles.css"
import dunkin from "../../images/dunkin.jpeg"
import {Routes, Route, useNavigate} from 'react-router-dom';


export const Card = () => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate('/StoreDetails');
  };
  return (
    <div className="card-container">
      <div className="card">
        <img id="store-image" src={dunkin} alt="React Image" />
        <div className="card-contents">
            <h1 id="store-name">Dunkin Donuts</h1>
            <h1 id="store-miles">5 Miles</h1>
            <button id="store-details" onClick={navigateToDetails}>Details</button>
        </div>
      </div>
    </div>
  );
};
