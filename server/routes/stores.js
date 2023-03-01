import { Router } from "express";
const router = Router();

import { getNearbyStores, getStoreDetails } from "../services/dataManager.js";
import { getPlacePhoto } from "../services/google/places.js";
import { applyFilter } from "../utils/filters.js";

router.get("/nearbystores/:filter", async function (req, res) {
  console.log(`/nearbystores/${req.params.filter}`);

  const stores = await getNearbyStores(
    req.query.lat,
    req.query.lng,
    req.query.radius
  );

  const filteredStores = await applyFilter(
    stores,
    req.params.filter,
    req.user,
    { lat: req.query.lat, lng: req.query.lng }
  );

  res.json(filteredStores);
});

router.get("/storedetails", async function (req, res) {
  console.log(`/storedetails ${req.query.storeId}`);

  const store = await getStoreDetails(req.query.storeId);

  res.json(store);
});

router.get("/storephoto", async function (req, res) {
  // First, we will call S3 here to see if we have image cached.

  // If no cached image exists, we will call google api.
  const photo = await getPlacePhoto(req.query.photoRef);

  res.send({ photoURL: photo });
});

export default router;
