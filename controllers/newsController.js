module.exports.getNews = async (req, res) => {
  try {
    return res.status(200).json({
      message: "fetching news from api",
    });
  } catch (err) {
    console.log("err: ", err);

    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};
