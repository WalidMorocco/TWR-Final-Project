const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
var router = express.Router();

//load user model
require('../models/User');
var User = mongoose.model('users');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password' });
    }

    return done(null, user);
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


//post routes
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
        req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
        });
        }
    })(req, res, next);
});
router.post('/register', async function(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    newUser.save(function(err) {
        if (err) { return res.json({ success: false, message: 'Signup failed' }); }
        res.json({ success: true, message: 'Signup successful' });
    });
});



// router.get('/logout', function (req, res) {
//     req.logout();
//     req.flash("success_msg", "You successfully logged out");
//     res.redirect('/users/login');
// });

module.exports = router;