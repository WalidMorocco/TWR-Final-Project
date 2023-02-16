import { Card } from "./Card/Card";
import useNearby from "../hooks/useNearby";

export const StoresList = ({ location, filter }) => {
  const { data, loading, error } = useNearby(
    location.coordinates.lat,
    location.coordinates.lng,
    "5000",
    filter
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data?.length &&
        data.map((store) => (
          <div key={store.storeId}>
            <Card
              storeId={store.storeId}
              name={store.name}
              distance={store.distance}
              photoRef={store.images ? store.images[0] : null}
            />
          </div>
        ))}
    </>
  );
};
