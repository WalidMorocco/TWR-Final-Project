import { getStoreDetails, getUserFavorites } from "../services/dataManager.js";

const filterAroundYou = (sourceList) => {
  if (sourceList?.length) {
    return sourceList?.sort((s1, s2) => (s1.distance < s2.distance ? -1 : 1));
  } else {
    return sourceList;
  }
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

const filterCurbsidePickup = (sourceList) => {
  return filterStoreDetail(sourceList, (details) => details?.curbsidePickup);
};

const filterDelivery = async (sourceList) => {
  return filterStoreDetail(sourceList, (details) => details?.delivery);
};

const filterFavorites = async (userId, location) => {
  const allFavorites = await getUserFavorites(userId, location);

  return filterAroundYou(allFavorites);
};

const filterBestRated = (sourceList) => {
  // Will need clarification.
  return sourceList.sort((s1, s2) => (s1.rating > s2.rating ? -1 : 1));
};

const filterCoffeeMe = (sourceList) => {
  return sourceList?.filter((store) => store.local);
};

export async function applyFilter(sourceList, filter, userId, location) {
  switch (filter) {
    case "aroundyou":
      return filterAroundYou(sourceList);
    case "curbside":
      return filterCurbsidePickup(sourceList);
    case "delivery":
      return await filterDelivery(sourceList);
    case "favorites":
      return filterFavorites(userId, location);
    case "bestrated":
      return filterBestRated(sourceList);
    case "coffeeme":
      return filterCoffeeMe(sourceList);
    default:
      return sourceList;
  }
}
