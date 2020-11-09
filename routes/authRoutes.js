const passport = require("passport");
const router = require("express").Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, resp, next) => {
    resp.redirect("/surveys");
  }
);

router.get("/api/logout", (req, resp) => {
  //Invoking logout() will remove the req.user property and clear the login session (if any).
  req.logout();
  resp.redirect("/");
});

router.get("/api/current_user", (req, resp) => {
  //resp.json(req.session);
  resp.send(req.user);
});

module.exports = router;
