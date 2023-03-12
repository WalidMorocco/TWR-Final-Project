import { Router } from "express";
import { model } from "mongoose";
const router = Router();

// Load review model
import "../models/Review.js";
let Review = model("reviews");

// Load rating model
let Rating = model("ratings");

router.post("/addreview", function (req, res) {
  console.log("/addreview");

  const newReview = new Review({
    storeId: req.body.storeId,
    user: req.user,
    text: req.body.text,
    rating: Number(req.body.rating),
    timestamp: req.body.timestamp,
  });

  newReview
    .save()
    .then(async function (review) {
      res.json(review);

      const currRating = await Rating.findOne({
        storeId: req.body.storeId,
      })
        .exec()
        .catch((err) => {
          console.error(err);
        });

      if (currRating) {
        currRating.ratingSum += Number(req.body.rating);
        currRating.ratingCount += 1;
        currRating.save().catch(function (err) {
          console.log(err);
        });
      } else {
        const newRating = new Rating({
          storeId: req.body.storeId,
          ratingSum: Number(req.body.rating),
          ratingCount: 1,
        });
        newRating.save().catch(function (err) {
          console.log(err);
        });
      }
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
