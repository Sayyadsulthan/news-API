const mongoose = require("mongoose");

const userChema = new mongoose.Schema({
  content: {
    type: {},
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Favourite = mongoose.model("Favourite", userChema);

module.exports = Favourite;
