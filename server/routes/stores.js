var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

const {
  getNearbyPlaces,
  getPlacePhoto,
  getPlaceDetails,
} = require("../google/places");

require("../models/Store");
var Store = mongoose.model("stores");

router.get("/nearbystores", async function (req, res) {
  console.log(
    `Calling getNearbyPlaces ${req.body.lat}, ${req.body.lon}, ${req.body.radius}`
  );

  var stores = await getNearbyPlaces(
    req.body.lat,
    req.body.lon,
    req.body.radius
  );
  console.log(`Stores fetched: ${stores}`);

  res.json(stores);
});

router.get("/storedetails/:id", async function (req, res) {
  var store;

  console.log(req.params.id);
  Store.findOne({ placeId: req.params.id })
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
        store = await getPlaceDetails(req.params.id);
        console.log(`Details fetched: ${store}`);
        res.json(store);
      }
    });
});

router.get("/storephoto", async function (req, res) {
  // First, we will call S3 here to see if we have image cached.

  // If no cached image exists, we will call google api.
  var photo = await getPlacePhoto(req.body.photoRef);
  console.log(`Photo fetched: ${photo}`);

  res.send({ photoURL: photo });
});

module.exports = router;
