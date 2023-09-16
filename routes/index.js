const express = require("express");

const app = express.Router();
app.get("/", (req, res) => {
    res.send("home page working fine");
  });
app.use("/api", require("./api"));

module.exports = app;
