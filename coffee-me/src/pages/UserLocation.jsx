import useLocation from "../hooks/useLocation";
import useGetIPLocation from "../hooks/useGetIPLocation";

export const UserLocation = () => {
    // const location = useLocation();
    const location = useGetIPLocation();

    return (
        <div className="wrapper">
            <h1>User's Location</h1>
            <h4>
                <p>Latitude: {location.coordinates.lat}</p>
                <p>Longitude: {location.coordinates.lng}</p>
            </h4>
        </div>
    )
}

export default UserLocation;
