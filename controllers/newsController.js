require("dotenv").config();

const User = require("../models/user");

module.exports.getNews = async (req, res) => {
  try {
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

module.exports.getUserInterestNews = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
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
