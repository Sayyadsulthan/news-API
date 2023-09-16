const express = require("express");
const app = express.Router();

// NEWS API
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("6dd692b41c024abbbefa59cce64d640d");

const usersController = require("../../../controllers/usersController");
const passport = require("passport");

app.post("/signUp", usersController.createUser);
app.post("/login", usersController.findUser);

app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  /*
    find the user
    */

  // query like id& q & interest
  console.log(req.query);

  return res.status(200).json({
    message: "api/user/",
  });
});
app.get("/category", (req, res) => {
  // query like id& q & interest
  console.log(req.query);
  /* find the news based on category

// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
//   
    {
      status: "ok",
      sources: [...]
    }
//   
});

*/
  return res.status(200).json({
    message: "api/user/category",
  });
});

module.exports = app;
