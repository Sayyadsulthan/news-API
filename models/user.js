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
    type: [{}],
  },
});

const User = mongoose.model("User", userChema);

module.exports = User;
