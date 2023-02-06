var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

require("../models/Review");
var Review = mongoose.model("reviews");

router.post("/addreview", async function (req, res) {
  var newReview = new Review({
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
