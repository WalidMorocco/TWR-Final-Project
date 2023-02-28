import { Router } from "express";
import { model } from "mongoose";
const router = Router();

import "../models/Seller";
const Seller = model("sellers");

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
