const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = require("../models/Survey");
const Mailer = require("../services/Mailer");
const template = require("../services/emailTemplates/surveyTemplate");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

router.get("/api/surveys", requireLogin, async (req, resp) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });

  //console.log("surveys ", surveys);
  resp.send(surveys);
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

router.get("/api/surveys/:surveyId/:choice", (req, resp) => {
  resp.send("Thanks for voting!");
});

router.post("/api/surveys/webhooks", (req, resp) => {
  const parser = new Path("/api/surveys/:surveyId/:choice");
  _.chain(req.body)
    .map(({ email, url }) => {
      const match = parser.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      //console.log(" id email choice ", surveyId, email, choice);
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  resp.send({});
});

module.exports = router;
