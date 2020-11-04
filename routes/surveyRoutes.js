const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

router.post("/api/surveys", requireLogin, requireCredits, (req, resp) => {});

module.exports = router;
