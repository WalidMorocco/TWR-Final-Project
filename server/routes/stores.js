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

  console.log(req.query.storeId);
  Store.findOne({ placeId: req.query.storeId })
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

        var newStore = new Store({
          placeId: placeDetails.place_id,
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
  var photo = await getPlacePhoto(req.query.photoRef);
  console.log(`Photo fetched: ${photo}`);

  res.send({ photoURL: photo });
});

module.exports = router;
