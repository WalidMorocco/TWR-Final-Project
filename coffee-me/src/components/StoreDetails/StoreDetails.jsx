import "./styles.css"
import dunkin from "../../images/dunkinDetails.jpeg"

export const StoreDetails = () => {
  return (
    <div className="storeDetails-container">
        <img id="store-image" src={dunkin} alt="React Image" />
    </div>
  );
};
