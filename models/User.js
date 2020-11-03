const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  credits: { type: Number, default: 0 },
});

module.exports = mongoose.model("users", userSchema);
