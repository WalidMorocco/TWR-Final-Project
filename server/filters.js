const filterAroundYou = (sourceList) => {
  return sourceList.sort((s1, s2) => (s1.distance > s2.distance ? -1 : 1));
};
const filterDriveThru = (sourceList) => {
  return sourceList?.filter((store) => store.driveThru);
};
const filterDelivery = (sourceList) => {
  return sourceList?.filter((store) => store.delivery);
};
const filterFavorites = (sourceList) => {
  // Will be implemented later.
  return sourceList;
};
const filterBestRated = (sourceList) => {
  // Will need clarification.
  return sourceList;
};
const filterLocal = (sourceList) => {
  return sourceList?.filter((store) => store.local);
};

module.exports = {
  applyFilter: (sourceList, filter) => {
    switch (filter) {
      case "aroundyou":
        return filterAroundYou(sourceList);
      case "drivethru":
        return filterDriveThru(sourceList);
      case "delivery":
        return filterDelivery(sourceList);
      case "favorites":
        return filterFavorites(sourceList);
      case "bestrated":
        return filterBestRated(sourceList);
      case "local":
        return filterLocal(sourceList);
      default:
        return stores;
    }
  },
};
