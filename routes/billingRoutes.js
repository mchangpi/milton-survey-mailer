const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/api/stripe", requireLogin, async (req, resp) => {
  /*const charge =*/ await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 credits",
    source: req.body.id,
  });
  //console.log(charge);
  req.user.credits += 5;
  const user = await req.user.save();
  resp.send(user);
});

module.exports = router;
