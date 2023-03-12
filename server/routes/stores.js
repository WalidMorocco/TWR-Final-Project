import { Router } from "express";
const router = Router();

import {
  getNearbyStores,
  getStoreDetails,
  getStoreReviews,
  getStorePhoto,
  getStoreRating,
} from "../services/dataManager.js";
import { applyFilter } from "../utils/filters.js";

router.get("/nearbystores/:filter", async function (req, res) {
  console.log(`/nearbystores/${req.params.filter}`);

  let stores = [];
  let nextPageToken = req.query.nextPageToken;
  do {
    let nearbySearchResult = await getNearbyStores(
      req.query.lat,
      req.query.lng,
      req.query.radius,
      nextPageToken
    );

    nextPageToken = nearbySearchResult?.nextPageToken;

    if (nearbySearchResult?.stores?.length) {
      stores = stores.concat(nearbySearchResult.stores);
    }
  } while (nextPageToken);

  const filteredStores = await applyFilter(
    stores,
    req.params.filter,
    req.user,
    { lat: req.query.lat, lng: req.query.lng, radius: req.query.radius }
  );

  res.json(filteredStores.filter((s) => s.distance <= req.query.radius));
});

router.get("/storedetails", async function (req, res) {
  console.log(`/storedetails ${req.query.storeId}`);

  const store = await getStoreDetails(req.query.storeId);

  res.json(store);
});

router.get("/storereviews", async function (req, res) {
  const storeReviews = await getStoreReviews(req.query.storeId);

  res.json(storeReviews);
});

router.get("/storephoto", function (req, res) {
  // First, we will call S3 here to see if we have image cached.

  // If no cached image exists, we will call google api.
  const photoURL = getStorePhoto(req.query.photoRef);

  res.send({ photoURL });
});

router.get("/storerating", async function (req, res) {
  const storeRating = await getStoreRating(req.query.storeId);

  res.json(storeRating);
});

export default router;
