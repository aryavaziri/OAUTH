const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      //   console.log(profile);
      request.user = profile;
      console.log(request.user);
      return done(null, profile);
    }
  )
);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/google/success",
    failureRedirect: "/login/google/failure",
    session: false,
  })
);

module.exports = router;
