const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
//const User = mongoose.model("users");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const strategy = new GoogleStrategy(
  {
    callbackURL: "/auth/google/callback",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    //console.log("profile ", profile);
    try {
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
        }).save();
      }
      done(null, user);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

passport.serializeUser((user, done) => {
  //console.log("serial user id ", user.id, " googleId ", user.googleId);
  done(null, user.id); // user.id is saved to session
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  //console.log("deserial user id ", user.id, " googleId ", user.googleId);
  done(null, user); // user attaches to the request as req.user
});

passport.use(strategy);
