import { Router } from "express";
import { model } from "mongoose";
const router = Router();

import "../models/Review";
let Review = model("reviews");

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
