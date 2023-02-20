import { Filters } from "../components/Filters/Filters";
import useLocation from "../hooks/useLocation";

export const UserLocation = () => {
  const location = useLocation();

  return (
    <div className="wrapper">
      <Filters />
      <h1>User's Location</h1>
      <h4>
        <p>Latitude: {location.coordinates.lat}</p>
        <p>Longitude: {location.coordinates.lng}</p>
      </h4>
    </div>
  );
};

export default UserLocation;
