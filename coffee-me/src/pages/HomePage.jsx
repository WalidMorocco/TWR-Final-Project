import useLocation from "../hooks/useLocation";
import useNearby from "../hooks/google/useNearby";
import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { Card } from "../components/Card/Card";


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
    <div>
      <Filters/>
      <Search/>
      <Card/>  
      <Card/>  
      <Card/>  
      <Card/>  
      <Card/>  
      <Card/>  
      <Card/>  
      <ul>
        {data.results.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    </div>
    
  );
};

export default HomePage;
