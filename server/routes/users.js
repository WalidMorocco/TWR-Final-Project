import { model } from "mongoose";
import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadImage, multerUpload } from "../services/aws/bucket.js";
var router = express.Router();

const secret = process.env.USER_AUTH_SECRET;

// Load user model
import "../models/User.js";
var User = model("users");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const token = jwt.sign({ userId: user.id }, secret);
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          picture: user.picture,
        },
      });
    });
  })(req, res, next);
});

router.post("/register", async function (req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Check if the username or email already exists in the database
  const existingUser = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });

  if (existingUser) {
    return res.json({
      success: false,
      message: "Username or email already in use",
    });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    picture: "https://twr-coffee-me.s3.amazonaws.com/images/default-avatar.jpg", //Default picture
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Sign Up failed" });
    }
    res.json({ success: true, message: "Sign Up successful" });
  });
});

router.put("/users/:id", async function (req, res) {
  const id = req.params.id;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Check if username already exists
  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser && existingUser._id.toString() !== user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: "Username already in use",
    });
  }

  // Update the user's information
  user.username = req.body.username;
  user.password = hashedPassword;

  // Save the updated user
  user.save(function (err) {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Update failed" });
    }
    res.json({ success: true, message: "Update successful" });
  });
});

router.post(
  "user/uploadimage",
  passport.authenticate("jwt", { session: false }),
  multerUpload.single("userImage"),
  (req, res) => {
    uploadImage(req.file, (error, data) => {
      if (error) {
        res.status(500).send({ err: error });
      }

      if (data) {
        // saving the information in the database.
        User.findById(req.user)
          .exec()
          .then(function (user) {
            if (user) {
              user.picture = data.Location;
              user
                .save()
                .then((result) => {
                  res.status(200).send({
                    _id: result._id,
                    username: result.username,
                    picture: data.Location,
                  });
                })
                .catch((err) => {
                  res.send({ message: err });
                });
            }
          });
      }
    });
  }
);

export default router;
