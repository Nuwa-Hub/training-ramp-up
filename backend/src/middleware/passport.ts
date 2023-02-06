import passport from "passport";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/google/callback",
    },
    function (profile: any, done: any) {
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});
