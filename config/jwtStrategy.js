const passport = require("passport");
const User = require("../models/user");
const { parse } = require("dotenv");
require("dotenv").config();

const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(opt, (jwtPayload, done) => {
    // console.log("strategy :", jwtPayload.user);
    User.findOne(parse(jwtPayload.user))
      .then((user) => {
        // console.log("user :", user);
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
    //TO DO
    // FIND THE USER FROM USER SCHEMA AND VALIDATE
  })
);
