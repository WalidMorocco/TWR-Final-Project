const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

//load user model
require("../models/User");
const User = mongoose.model("users");

//Routes for Sign in
router.get("/login", function (req, res) {
  if (req.session.messages) {
    req.flash("error_msg", req.session.messages);
    req.session.messages = null;
    res.redirect("/users/login");
  } else {
    res.render("users/login");
  }
});

router.get("/register", function (req, res) {
  res.render("users/register");
});

//post routes
router.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: '/messages/chat',
    // failureRedirect: '/users/login',
    // failureMessage: true
  })
);

router.post("/register", async function (req, res) {
  console.log(req.body);
  let errors = [];

  await User.findOne({ email: req.body.email })
    .exec()
    .then(function (user) {
      if (user) {
        errors.push("A user with this email already exists.");
      }
    });

  await User.findOne({ username: req.body.username })
    .exec()
    .then(function (user) {
      if (user) {
        errors.push("Username already in use.");
      }
    });

  if (errors.length > 0) {
    // res.render('users/register', {
    //     error_msg: errors,
    //     username: req.body.username,s
    //     email: req.body.email,
    //     password: req.body.password,
    //     password2: req.body.password2
    // });
  } else {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(function (user) {
            res.redirect("/users/login");
          })
          .catch(function (err) {
            console.log(err);
            errors.push({ err: err });
            // res.render('users/register', {
            //     errors: errors,
            // });
            return;
          });
      });
    });
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success_msg", "You successfully logged out");
  res.redirect("/users/login");
});

module.exports = router;
