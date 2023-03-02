import { Router } from "express";
import { model } from "mongoose";
const router = Router();

// Load review model
import "../models/Review.js";
let Review = model("reviews");

router.post("/addreview", function (req, res) {
  const newReview = new Review({
    storeId: req.query.storeId,
    user: req.user,
    text: req.query.text,
    rating: req.query.rating,
    timestamp: req.query.timestamp,
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
    user: req.user,
  })
    .exec()
    .then(function (review) {
      review.text = req.query.text;
      review.rating = req.query.rating;
      review.timestamp = req.query.timestamp;

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
    user: req.user,
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
