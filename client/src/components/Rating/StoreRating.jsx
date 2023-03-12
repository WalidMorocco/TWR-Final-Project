import PropTypes from "prop-types";
import useFetch from "../../hooks/crud/useFetch";
import { CupsRating } from "./CupsRating";

export const StoreRating = ({ storeId }) => {
  const { data } = useFetch(`storerating?storeId=${storeId}`);

  return (
    <CupsRating
      size="full"
      theme="dark"
      rating={data?.rating}
      ratingCount={data?.ratingCount}
    />
  );
};

StoreRating.propTypes = {
  storeId: PropTypes.string.isRequired,
};
