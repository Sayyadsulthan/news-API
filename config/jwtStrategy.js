const passport = require("passport");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new JwtStrategy(opt, (jwtPayload, done) => {
    //TO DO 
    // FIND THE USER FROM USER SCHEMA AND VALIDATE
  })
);
