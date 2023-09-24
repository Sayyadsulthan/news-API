const fetch = require("node-fetch");

const User = require("../models/user");
require("dotenv").config();

//  THIS MODULE WILL GIVE THE NEWS / ARTICLES BASED ON USER QUERY LIKE SPORTS, HEALTH ....
module.exports.getNews = async (req, res) => {
  try {
    // Fetching the news from newsapi
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${req.query.q}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();

    return res.status(200).json({
      message: "fetching news from api",
      success: true,
      data,
    });
  } catch (err) {
    console.log("err: ", err);

    return res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
};

// GET THE NEWS FROM NEWS API BASED ON USER INTEREST IF EXIST ELSE TECHNOLOGY NEWS WILL COME
module.exports.getUserInterestNews = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // if have user in db
    if (user) {
      // Fetching the news from newsapi
      fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${
          user.interest || "technology"
        }&apiKey=${process.env.NEWS_API_KEY}`
      )
        .then((res) => res.json())
        .then((response) => {
          return res.status(200).json({
            success: true,
            data: response,
          });
        });
    } else {
      // If user not found
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
  } catch (err) {
    console.log("err: ", err);

    return res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
};
