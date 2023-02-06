var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

require("../models/Seller");
var Seller = mongoose.model("sellers");

router.post("/createseller", async function (req, res) {
  var newSeller = new Seller({
    userId: placeDetails.place_id,
    storeId: placeDetails.name,
  });

  newSeller
    .save()
    .then(function (seller) {
      res.json(seller);
    })
    .catch(function (err) {
      console.log(err);
      return;
    });
});
