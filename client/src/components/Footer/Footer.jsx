import "./styles.css";
import { useNavigate } from "react-router-dom";
import Home from "@mui/icons-material/Home";

export const Footer = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="footer-container">
      <div className="top-filters">
        <div className="home-filter">
          <button className="filter-1" onClick={navigateToHome}>
            <Home 
              style={{
                color:"white",
                fontSize:"40px",
                marginTop:"5px"
              }}/>
          </button>
        </div>
      </div>
    </div>
  );
};
