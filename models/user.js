const mongoose = require("mongoose");

const userChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  interest: {
    type: mongoose.Schema.Types.String,
    enum: ["technology", "sports", "politics", "health"],
  },
  favourite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favourite",
    },
  ],
});

const User = mongoose.model("User", userChema);

module.exports = User;
