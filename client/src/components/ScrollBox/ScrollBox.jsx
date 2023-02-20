import "./styles.css"
import { Card } from "../Card/Card";
import { StoresList } from "../StoresList";
import useLocation from "../../hooks/useLocation";

export const ScrollBox = () => {
  const location = useLocation();
  return (
    <div className="scroll-container">
        {location.loaded && <StoresList location={location} />}
    </div>
  );
};