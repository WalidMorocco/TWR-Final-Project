import useLocation from "../hooks/useLocation";
import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { Card } from "../components/Card/Card";
import { ScrollBox } from "../components/ScrollBox/ScrollBox";
import { useEffect, useState } from "react";
import { computeDistanceBetween, LatLng } from "spherical-geometry-js";
import axios from "axios";

export const HomePage = () => {
  const [data, setData] = useState();
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    if (location) {
      axios
        .get("http://localhost:5000/nearbystores", {
          params: {
            lat: location.coordinates.lat,
            lon: location.coordinates.lng,
            radius: "200000",
          },
        })
        .then(function (response) {
          setData(response.data);
        });
    }
  }, [location]);

  /*const { data, loading, error } = useNearby(
    location.coordinates.lat,
    location.coordinates.lng
  );*/

  if (data == null) {
    return <p>Loading...</p>;
  }

  /*if (error) {
    return <p>Error: {error.message}</p>;
  }*/
  console.log(data);
  return (
    <>
      <Filters />
      <Search />
      {/**<ScrollBox/>**/}
      {data.results.map((place) => (
        <div key={place.place_id}>
          <Card
            name={place.name}
            distance={computeDistanceBetween(
              new LatLng(location.coordinates.lat, location.coordinates.lng),
              new LatLng(
                place.geometry.location.lat,
                place.geometry.location.lng
              )
            )}
            photoRef={place.photos[0].photo_reference}
          />
        </div>
      ))}
    </>
  );
};

export default HomePage;
