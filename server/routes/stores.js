//const geometry = require("spherical-geometry-js");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const {
  getNearbyPlaces,
  getPlacePhoto,
  getPlaceDetails,
} = require("../google/places");

const filters = require("../filters");

require("../models/Store");
const Store = mongoose.model("stores");

require("../models/Search");
const Search = mongoose.model("searches");

router.get("/nearbystores/:filter", async function (req, res) {
  console.log(
    `Calling getNearbyPlaces ${req.query.lat}, ${req.query.lon}, ${req.query.radius}`
  );

  const stores = await getNearbyPlaces(
    req.query.lat,
    req.query.lon,
    req.query.radius
  );
  console.log(`Stores fetched: ${stores}`);

  const allStores = stores?.results.map(
    (s) =>
      new Store({
        storeId: s.place_id,
        name: s.name,
        location: {
          address: s.vicinity,
          lat: s.geometry.location.lat,
          lng: s.geometry.location.lng,
        },
        rating: s.rating,
        images: s?.photos?.map((p) => p.photo_reference),
        distance: computeDistanceBetween(
          new LatLng(req.query.lat, req.query.lon),
          new LatLng(s.location.lat, s.location.lng)
        ),
      })
  );

  const newSearch = new Search({
    location: {
      lat: req.query.lat,
      lng: req.query.lon,
    },
    results: allStores,
  });

  newSearch.save();

  console.log(`Using filter ${req.params.filter}`);
  const filteredStores = filters.applyFilter(allStores, req.params.filter);

  res.json(filteredStores);
});

router.get("/storedetails", async function (req, res) {
  let store;

  console.log(req.query.storeId);
  Store.findOne({ storeId: req.query.storeId })
    .exec()
    .then((result) => {
      console.log(`mongo result: ${result}`);
      store = JSON.parse(JSON.stringify(result));

      if (store) {
        res.json(store);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .then(async () => {
      if (store == null) {
        const response = await getPlaceDetails(req.query.storeId);
        console.log(`Details fetched: ${response}`);

        const placeDetails = response.result;

        let newStore = new Store({
          storeId: placeDetails.place_id,
          name: placeDetails.name,
          description: placeDetails?.editorial_summary?.overview,
          phone: placeDetails.formatted_phone_number,
          location: {
            address: placeDetails.vicinity,
            lat: placeDetails.geometry.location.lat,
            lng: placeDetails.geometry.location.lng,
          },
          delivery: placeDetails.delivery,
          rating: placeDetails.rating,
          openingHours: placeDetails?.current_opening_hours?.weekday_text,
          images: placeDetails?.photos?.map((p) => p.photo_reference),
        });

        newStore
          .save()
          .then(function (user) {
            res.json(user);
          })
          .catch(function (err) {
            console.log(err);
            return;
          });
      }
    });
});

router.get("/storephoto", async function (req, res) {
  // First, we will call S3 here to see if we have image cached.

  // If no cached image exists, we will call google api.
  const photo = await getPlacePhoto(req.query.photoRef);
  console.log(`Photo fetched: ${photo}`);

  res.send({ photoURL: photo });
});

module.exports = router;
