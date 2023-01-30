import useGetIPLocation from "../hooks/useGetIPLocation";
import useNearby from "../hooks/google/useNearby";

export const HomePage = () => {

  // const location = useLocation();
  const location = useGetIPLocation();

  const { data, loading, error } = useNearby(
    location.latitude,
    location.longitude,
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