import { getStoreDetails } from "../services/dataManager.js";

const filterAroundYou = (sourceList) => {
  return sourceList?.sort((s1, s2) => (s1.distance < s2.distance ? -1 : 1));
};

const filterStoreDetail = async (sourceList, detailPredicate) => {
  const asyncFilter = async (arr, predicate) => {
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_v, index) => results[index]);
  };

  const result = await asyncFilter(sourceList, async (s) => {
    const details = await getStoreDetails(s.storeId);
    return detailPredicate(details);
  });

  return filterAroundYou(result);
};

const filterDriveThru = (sourceList) => {
  return filterStoreDetail(sourceList, (details) => details?.driveThru);
};

const filterDelivery = async (sourceList) => {
  return filterStoreDetail(sourceList, (details) => details?.delivery);
};

const filterFavorites = (sourceList) => {
  // Will be implemented later.
  return sourceList;
};

const filterBestRated = (sourceList) => {
  // Will need clarification.
  return filterAroundYou(sourceList.filter((s) => s.rating > 4.5));
};

const filterLocal = (sourceList) => {
  return sourceList?.filter((store) => store.local);
};

export async function applyFilter(sourceList, filter) {
  switch (filter) {
    case "aroundyou":
      return filterAroundYou(sourceList);
    case "drivethru":
      return filterDriveThru(sourceList);
    case "delivery":
      return await filterDelivery(sourceList);
    case "favorites":
      return filterFavorites(sourceList);
    case "bestrated":
      return filterBestRated(sourceList);
    case "local":
      return filterLocal(sourceList);
    default:
      return stores;
  }
}
