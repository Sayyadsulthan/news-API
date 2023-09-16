const express = require("express");
const app = express.Router();
const passport = require("passport");

const newsController = require("../../../../controllers/newsController");

app.get("/category", newsController.getNews);
app.get("/user-interest", newsController.getUserInterestNews);

module.exports = app;
