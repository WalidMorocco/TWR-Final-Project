import { StoreDetails } from "../components/StoreDetails/StoreDetails";

export const StoreDetailsPage = (storeId) => {
  return (
    <div>
      <StoreDetails storeId={storeId} />
    </div>
  );
};

export default StoreDetailsPage;
