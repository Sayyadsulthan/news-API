const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("db is connected successfull");
});

const db = mongoose.connection;

db.on("error", (err) => {
  if (err) {
    console.log("error in connectiong to db");
  }
});

db.once("open", () => {
  console.log("db is connection successfull...");
});

module.exports = db;
