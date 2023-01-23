import useLocation from "../hooks/useLocation";
import useNearby from "../hooks/google/useNearby";

export const HomePage = () => {
  const location = useLocation();

  console.log(location);
  const { data, loading, error } = useNearby(
    location.coordinates.lat,
    location.coordinates.lng
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.results.map((place) => (
        <li key={place.place_id}>{place.name}</li>
      ))}
    </ul>
  );
};

export default HomePage;
