import { Router } from "express";
import { model } from "mongoose";
const router = Router();

import "../models/Favorite.js";
const Favorite = model("favorites");

router.get("/getfavorites", async function (req, res) {
  const result = await Favorite.find({
    users: req.query.userId,
  })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  const userFavorites = JSON.parse(JSON.stringify(result));

  res.json(userFavorites);
});

router.post("/favorite", async function (req, res) {
  let favorite = await Favorite.findOne({ storeId: req.body.storeId })
    .exec()
    .catch((err) => {
      res.send({ message: err });
    });

  if (favorite?.users?.includes(req.user)) {
    res.status(200).send({
      _id: favorite._id,
      name: favorite.name,
      users: favorite.users,
    });
  } else {
    if (favorite === null) {
      favorite = new Favorite({
        storeId: req.body.storeId,
        users: [],
        name: req.body.name,
        location: req.body.location,
        image: req.body.image,
      });
    }

    favorite.users.push(req.user);
    favorite.save().then((result) => {
      res.status(200).send({
        _id: result._id,
        name: result.name,
        users: result.users,
      });
    });
  }
});

router.post("/unfavorite", function (req, res) {
  Favorite.findOne({
    storeId: req.body.storeId,
    users: req.user,
  })
    .exec()
    .then((favorite) => {
      if (favorite) {
        const index = favorite.users.indexOf(req.user);
        favorite.users.splice(index, 1);

        if (!favorite.users.length) {
          Favorite.deleteOne({ _id: favorite._id }).then((result) => {
            res.status(200).send({
              _id: result._id,
            });
          });
        } else {
          favorite.save().then((result) => {
            res.status(200).send();
          });
        }
      } else {
        res.status(200).send();
      }
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

router.get("/isfavorite", async function (req, res) {
  const result = await Favorite.findOne({
    storeId: req.query.storeId,
    users: req.user,
  })
    .exec()
    .catch((err) => {
      console.error(err);
    });

  res.send({ isFavorite: result ? true : false });
});

export default router;
