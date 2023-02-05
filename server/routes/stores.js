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
    `Calling getNearbyPlaces ${req.query.lat}, ${req.query.lon}, ${req.query.radius}`
  );

  var stores = await getNearbyPlaces(
    req.query.lat,
    req.query.lon,
    req.query.radius
  );
  console.log(`Stores fetched: ${stores}`);

  res.json(stores);
});

router.get("/storedetails", async function (req, res) {
  var store;

  console.log(req.query.placeId);
  Store.findOne({ placeId: req.query.placeId })
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
        const response = await getPlaceDetails(req.query.placeId);
        console.log(`Details fetched: ${response}`);

        const placeDetails = response.result;

        var newStore = new Store({
          placeId: placeDetails.place_id,
          name: placeDetails.name,
          phone: placeDetails.formatted_phone_number,
          location: `${placeDetails.geometry.location.lat},${placeDetails.geometry.location.lng}`,
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
  var photo = await getPlacePhoto(req.query.photoRef);
  console.log(`Photo fetched: ${photo}`);

  res.send({ photoURL: photo });
});

module.exports = router;
