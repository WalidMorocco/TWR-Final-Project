import "./styles.css";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

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
            <HomeOutlinedIcon fontSize="large" sx={{ color: "white" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
