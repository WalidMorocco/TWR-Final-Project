import { Card } from "./Card/Card";
import { computeDistanceBetween, LatLng } from "spherical-geometry-js";
import useNearby from "../hooks/useNearby";

export const StoresList = ({ location }) => {
  const { data, loading, error } = useNearby(
    location.coordinates.lat,
    location.coordinates.lng,
    "5000"
  );

  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data &&
        data.results &&
        data.results.length &&
        data.results.map((place) => (
          <div key={place.place_id}>
            <Card
              storeId={place.place_id}
              name={place.name}
              distance={computeDistanceBetween(
                new LatLng(location.coordinates.lat, location.coordinates.lng),
                new LatLng(
                  place.geometry.location.lat,
                  place.geometry.location.lng
                )
              )}
              photoRef={place.photos ? place.photos[0].photo_reference : null}
            />
          </div>
        ))}
    </>
  );
};
