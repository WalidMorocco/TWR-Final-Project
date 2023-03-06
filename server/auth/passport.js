import { model } from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as Jwtstrategy, ExtractJwt } from "passport-jwt";

import "../models/User.js";
var User = model("users");

export default function (passport) {
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

  passport.use(
    new Jwtstrategy(
      {
        secretOrKey: process.env.USER_AUTH_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.userId);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
