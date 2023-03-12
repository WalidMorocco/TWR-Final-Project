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
    $or: [
      { username_lower: req.body.username.toLowerCase() },
      { email: req.body.email.toLowerCase() },
    ],
  });

  if (existingUser) {
    return res.json({
      success: false,
      message: "Username or email already in use",
    });
  }

  const newUser = new User({
    username: req.body.username,
    username_lower: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
    picture: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/images/system/default-avatar.jpg`, //Default picture
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Sign Up failed" });
    }
    res.json({ success: true, message: "Sign Up successful" });
  });
});

router.post(
  "/user/update",
  passport.authenticate("jwt", { session: false }),
  multerUpload.single("picture"),
  async function (req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      req.body.username &&
      req.body.username.toLowerCase() !== user.username_lower
    ) {
      // Check if username already exists
      const existingUser = await User.findOne({
        username_lower: req.body.username.toLowerCase(),
      });

      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.json({
          success: false,
          message: "Username already in use",
        });
      }

      user.username = req.body.username;
      user.username_lower = req.body.username.toLowerCase();
    }

    if (req.body.password) {
      user.password = hashedPassword;
    }

    if (req.file) {
      var n = user.picture.lastIndexOf("/");
      var previousImage = user.picture.substring(n + 1);
      uploadImage(
        req.file,
        "users/",
        `${req.user}_${new Date().getTime()}`,
        previousImage,
        (error, data) => {
          if (error) {
            res.status(500).send({ err: error });
          }

          user.picture = data.Location;

          // Save the updated user
          user.save(function (err) {
            if (err) {
              console.log(err);
              return res.json({ success: false, message: "Update failed" });
            }

            res.json({
              success: true,
              username: user.username,
              picture: user.picture,
              message: "Update successful",
            });
          });
        }
      );
    } else {
      // Save the updated user
      user.save(function (err) {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: "Update failed" });
        }

        res.json({
          success: true,
          username: user.username,
          picture: user.picture,
          message: "Update successful",
        });
      });
    }
  }
);

export default router;
