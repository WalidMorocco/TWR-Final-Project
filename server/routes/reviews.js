import { Router } from "express";
import { model } from "mongoose";
const router = Router();

// Load review model
import "../models/Review.js";
let Review = model("reviews");

router.post("/addreview", function (req, res) {
  console.log("/addreview");

  const newReview = new Review({
    storeId: req.body.storeId,
    user: req.user,
    text: req.body.text,
    rating: req.body.rating,
    timestamp: req.body.timestamp,
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
    storeId: req.body.storeId,
    user: req.user,
  })
    .exec()
    .then(function (review) {
      review.text = req.body.text;
      review.rating = req.body.rating;
      review.timestamp = req.body.timestamp;

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
    storeId: req.body.storeId,
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
