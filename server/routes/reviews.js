const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

require("../models/Review");
let Review = mongoose.model("reviews");

router.post("/addreview", async function (req, res) {
  let newReview = new Review({
    storeId: req.query.storeId,
    name: req.query.name,
    title: req.query.title,
    description: req.query.description,
    rating: req.query.rating,
  });

  newReview
    .save()
    .then(function (review) {
      res.json(review);
    })
    .catch(function (err) {
      console.log(err);
      return;
    });
});
