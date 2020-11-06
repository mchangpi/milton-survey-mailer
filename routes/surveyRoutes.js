const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = require("../models/Survey");
const Mailer = require("../services/Mailer");
const template = require("../services/emailTemplates/surveyTemplate");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

router.get("/api/surveys/thanks", (req, resp) => {
  resp.send("Thanks for voting!");
});

router.post("/api/surveys", requireLogin, requireCredits, async (req, resp) => {
  const { title, subject, body, recipients } = req.body;
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => {
      return { email: email.trim() };
    }),
    _user: req.user.id,
    dateSent: Date.now(),
  });
  const mailer = new Mailer(survey, template(survey));
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    resp.send(user);
  } catch (err) {
    resp.status(422).send(err);
  }
});

module.exports = router;
