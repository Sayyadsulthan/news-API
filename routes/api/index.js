const express = require("express");

const app = express.Router();


app.get("/", (req, res) => {
  res.send("<h1> API Home page</h1>");
});

app.use("/user", require("./users"));

module.exports = app;
