/* fetch method
https://newsapi.org/v2/everything?q=viratkohli&sortBy=publishedAt&apiKey=6dd692b41c024abbbefa59cce64d640d


*/

// NEWS API
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("6dd692b41c024abbbefa59cce64d640d");

const User = require("../models/user");

module.exports.getNews = async (req, res) => {
  try {
    // const response = await fetch(
    //   `https://newsapi.org/v2/everything?q=${req.query.q}&sortBy=publishedAt&apiKey=6dd692b41c024abbbefa59cce64d640d`
    // );
    const response = await newsapi.v2.sources({
      q: req.query.q,
      language: "en",
      // psge: 2,
      // country: "us",
    });
    const data = response;

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
    const user = await User.findById(req.user.id);
    console.log(user.interest);
    if (user) {
      newsapi.v2
        .sources({
          category: user.interest,
          language: "en",
          country: "us",
        })
        .then((response) => {
          // console.log(response);
          return res.status(200).json({
            // message:""
            success: true,
            data: response,
          });
        });
    }

    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  } catch (err) {
    console.log("err: ", err);

    return res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
};
