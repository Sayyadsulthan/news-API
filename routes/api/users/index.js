const express = require("express");
const app = express.Router();

// NEWS API
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("6dd692b41c024abbbefa59cce64d640d");

const usersController = require("../../../controllers/usersController");
const passport = require("passport");

app.post("/signUp", usersController.createUser);
app.post("/login", usersController.findUser);

app.patch(
  "/update-interest",
  passport.authenticate("jwt", { session: false }),
  usersController.updateUserInterest
);
app.post(
  "/add-fav-news",
  passport.authenticate("jwt", { session: false }),
  usersController.addFavNews
);
app.delete(
  "/remove-fav-news",
  passport.authenticate("jwt", { session: false }),
  usersController.removeFavNews
);

app.use(
  "/news",
  passport.authenticate("jwt", { session: false }),
  require("./news")
);

module.exports = app;
