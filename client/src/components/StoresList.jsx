import { Card } from "./Card/Card";
import useNearby from "../hooks/useNearby";
import { Loading } from "./Loading/Loading";

export const StoresList = ({ location, filter }) => {
  const { data, loading, error } = useNearby(
    location.lat,
    location.lng,
    "8000",
    filter
  );

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <Loading />;
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
