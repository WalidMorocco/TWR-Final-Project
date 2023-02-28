import { Router } from "express";
import { model } from "mongoose";
const router = Router();

import "../models/Review.js";
let Review = model("reviews");

router.get("/getreviews", async function (req, res) {
  const result = await Review.find({
    storeId: req.query.storeId,
  })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  const storeReviews = JSON.parse(JSON.stringify(result));

  res.json(storeReviews);
});

router.post("/addreview", function (req, res) {
  const newReview = new Review({
    storeId: req.query.storeId,
    username: req.query.username,
    title: req.query.title,
    description: req.query.description,
    rating: req.query.rating,
    timestamp: new Date(),
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

router.post("/updatereview", function (req, res) {
  Review.findOne({
    storeId: req.query.storeId,
    username: req.query.username,
  })
    .exec()
    .then(function (review) {
      review.title = req.query.title;
      review.description = req.query.description;
      review.rating = req.query.rating;
      review.timestamp = new Date();

      review.save().then((result) => {
        res.status(200).send({
          _id: result._id,
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/deletereview", function (req, res) {
  Review.deleteOne({
    storeId: req.query.storeId,
    username: req.query.username,
  })
    .exec()
    .then((result) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;
