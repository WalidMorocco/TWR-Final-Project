import "./styles.css"
import { useNavigate} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
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
          <IconContext.Provider value={{ className: "home-icon" }}>
          <button className="filter-1" onClick={navigateToHome}>
            <Home 
              style={{
                color:"white",
                fontSize:"40px",
                marginTop:"5px"
              }}/>
          </button>
        </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};
