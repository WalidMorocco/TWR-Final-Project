import {
  getStoreDetails,
  getUserFavorites,
  getAverageRating,
} from "../services/dataManager.js";

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

const filterBestRated = async (sourceList) => {
  const ratings = await Promise.all(
    sourceList.map(async (s) => {
      const avgRating = await getAverageRating(
        s.storeId,
        s.rating,
        s.ratingsCount
      );
      s.rating = avgRating.rating;
      s.ratingsCount = avgRating.ratingCount;
      return s.rating;
    })
  );

  let maxRating = Math.max.apply(null, ratings);

  const ratingThreshold = maxRating - 0.5;
  const bestRated = sourceList.filter((s) => s.rating > ratingThreshold);
  return filterAroundYou(bestRated);
};

const filterCoffeeMe = (sourceList) => {
  return sourceList?.filter((store) => store.local);
};

export async function applyFilter(sourceList, filter, userId, location) {
  switch (filter) {
    case "aroundyou":
      return filterAroundYou(sourceList);
    case "curbside":
      return await filterCurbsidePickup(sourceList);
    case "delivery":
      return await filterDelivery(sourceList);
    case "favorites":
      return await filterFavorites(userId, location);
    case "bestrated":
      return await filterBestRated(sourceList);
    case "coffeeme":
      return filterCoffeeMe(sourceList);
    default:
      return sourceList;
  }
}
