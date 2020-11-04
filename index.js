const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
require("./services/passport");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({ maxAge: 1 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY] })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(billingRoutes);
app.use(surveyRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, resp) => {
    resp.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((error, req, resp, next) => {
  resp.status(error.code || 500).json({ message: error.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("mode", process.env.NODE_ENV, "listen on port", PORT);
});
