import "./styles.css";
  import { useNavigate } from "react-router-dom";
  import Car from "@mui/icons-material/LocationOnSharp";
  import Website from "@mui/icons-material/Info";
  import Phone from "@mui/icons-material/Phone";
  import useDetails from "../../hooks/useDetails";
  import { Loading } from "../Loading/Loading";
  import { LocationContext } from "../../context/LocationContext";
  import { useContext } from "react";
  
  const mapsBaseURL = "https://www.google.com/maps/dir/";
  const getNavigationURL = (userlocation, storeLocation) => {
    return `${mapsBaseURL}${
      userlocation.location.address
        ? userlocation.location.address
        : "My Location"
    }/@${userlocation.location.lat},${userlocation.location.lng}/${
      storeLocation.address
    }`;
  };
  
  export const SearchResult = ({ storeId, handleSwitchModal }) => {
    const navigate = useNavigate();
    const { data, loading, error } = useDetails(storeId);
  
    const refreshPage = () => {
      window.location.reload(false);
    };
  
    const navigateToDetails = () => {
      navigate(`/StoreDetails/${storeId}`);
    };
  
    const call = () => {
      console.log(data.phone);
      window.location.href = 'tel://' + data.phone;
    }
    
    const locationContext = useContext(LocationContext);
  
    const gps = () => {
      window.location.href = getNavigationURL(locationContext.settings, data.location);
    }
  
    if (error) {
      console.log(error);
    }
  
    if (loading) {
      return <Loading />;
    }

    console.log(data);
    return (
        <div className="results-container">
          <div className="title-result">
            <h1 id="r-title">{data.name}</h1>
          </div>
          <div className="button-search-group">
            <button id="btnA" onClick={gps}>
              <Car
                style={{
                  color: "white",
                  fontSize: "25px",
                  marginTop: "1px",
                }}
              />
            </button>
            <button id="btnB" onClick={navigateToDetails}>
              <Website
                style={{
                  color: "white",
                  fontSize: "25px",
                  marginTop: "1px",
                }}
              />
            </button>
            <button id="btnC" onClick={call}>
              <Phone
                style={{
                  color: "white",
                  fontSize: "25px",
                  marginTop: "1px",
                }}
              />
            </button>
          </div>
          <div className="rating-result">
            <p id="r-rating">Rating: {data.rating}</p>
          </div>
          <div className="delivery-result">
            <p id="d-delivery">
              Delivery: {data.delivery ? "Available" : "Unavailable"}
            </p>
          </div>
          <div className="curbside-result">
            <p id="c-curbside">
              Curbside Pickup: {data.curbsidePickup ? "Available" : "Unavailable"}
            </p>
          </div>
          <div className="close-button">
            <button id="close" onClick={refreshPage}>
              Close
            </button>
          </div>
        </div>
    );
  };
  
  export default SearchResult;