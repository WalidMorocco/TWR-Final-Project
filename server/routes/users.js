import { model } from "mongoose";
import express from "express";
import expressSession from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadImage, multerUpload } from "../services/aws/bucket.js";
var router = express.Router();
const secret = "47DDBD4D13F45F298693D395AE66B";

// Load user model
import "../models/User.js";
var User = model("users");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const token = jwt.sign({ userId: user.id }, secret);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
      console.log(req.user);
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
    return res.status(400).json({
      success: false,
      message: "Username or email already in use",
    });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Sign Up failed" });
    }
    res.json({ success: true, message: "Sign Up successful" });
  });
});

// Implement the logout endpoint
router.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Logged out successfully" });
});

router.post("/uploadimage", multerUpload.single("userImage"), (req, res) => {
  uploadImage(req.file, (error, data) => {
    if (error) {
      res.status(500).send({ err: error });
    }

    // If not then below code will be executed
    console.log(data);

    if (data) {
      // saving the information in the database.
      User.findOne({ username: req.body.username })
        .exec()
        .then(function (user) {
          if (user) {
            user.profileImage = data.Location;
            user
              .save()
              .then((result) => {
                res.status(200).send({
                  _id: result._id,
                  username: result.username,
                  profileImage: data.Location,
                });
              })
              .catch((err) => {
                res.send({ message: err });
              });
          }
        });
    }
  });
});

router.post("/favorite", function (req, res) {
  // saving the information in the database.
  User.findOne({ username: req.body.username })
    .exec()
    .then(function (user) {
      if (user) {
        user.favorites.push(req.body.storeId);
        user
          .save()
          .then((result) => {
            res.status(200).send({
              _id: result._id,
              username: result.username,
              favorites: result.favorites,
            });
          })
          .catch((err) => {
            res.send({ message: err });
          });
      }
    });
});

router.get('/user', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, secret);
  // Assuming you have a User model
  User.findById(userId).then((user) => {
    res.json({ id: user.id, email: user.email, username: user.username });
  });
});

export default router;
