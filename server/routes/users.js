const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var router = express.Router();
const secret = '47DDBD4D13F45F298693D395AE66B'

// Load user model
require('../models/User');
var User = mongoose.model('users');
mongoose.set('strictQuery', true);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
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
            res.json({ token });
            console.log(req.user);
        });
    })(req, res, next);
});


router.post('/register', async function(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }]
    });

    if (existingUser) {
        return res.status(400).json({
        success: false,
        message: 'Username or email already in use'
        });
    }
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    newUser.save(function(err) {
        if (err) { return res.json({ success: false, message: 'Sign Up failed' }); }
        res.json({ success: true, message: 'Sign Up successful' });
    });
});

// Implement the logout endpoint
router.get("/logout", (req, res) => {
    req.logout();
    res.send({ message: "Logged out successfully" });
});

module.exports = router;