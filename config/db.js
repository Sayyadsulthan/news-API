const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/newsAPI").then(() => {
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