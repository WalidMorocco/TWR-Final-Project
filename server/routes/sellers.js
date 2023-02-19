const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

require("../models/Seller");
const Seller = mongoose.model("sellers");

router.post("/createseller", async function (req, res) {
  const newSeller = new Seller({
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
