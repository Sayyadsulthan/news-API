const mongoose = require("mongoose");

const userChema = new mongoose.Schema({
  data: {
    type: {},
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Favourite = mongoose.model("Favourite", userChema);

module.exports = Favourite;
