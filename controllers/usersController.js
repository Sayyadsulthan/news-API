const { parse } = require("dotenv");
const Favourite = require("../models/favourite");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createUser = async (req, res) => {
  try {
    const { email, name, password, confirm_password } = req.body;

    if (!email || !name || !password || !confirm_password) {
      return res.status(400).json({
        message: "Please fill the required fields",
        success: false,
      });
    }
    if (password !== confirm_password) {
      return res.status(401).json({
        message: "Password and confirm_password not matches",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist",
        success: false,
      });
    }
    await User.create({ email, name, password });

    return res.status(201).json({
      message: " User account created successfull ",
      data: {},
      success: true,
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

module.exports.findUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("favourite");
    if (!user || user.password !== password) {
      console.log("user not found || invalid credentials");
      console.log("user :", user);
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // console.log(user);
    const token = jwt.sign(
      JSON.stringify({
        name: user.name,
        email: user.email,
        id: user._id,
        Favourite: user.favourite,
        interest: user.interest,
      }),
      process.env.SECRET_KEY,
      {
        algorithm: process.env.ENCRYPT_ALGORITHM,
      }
    );
    return res.status(200).json({
      message: "user found please keep token secret",
      success: true,
      data: {
        token,
      },
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

module.exports.updateUserInterest = async (req, res) => {
  try {
    let interest = req.body.interest;
    switch (req.body.interest) {
      case "health":
        interest = "health";
        break;
      case "sports":
        interest = "sports";
        break;
      case "politics":
        interest = "politics";
        break;
      default:
        interest = "technology";
        break;
    }

    // console.log("interest : ", interest);
    await User.findByIdAndUpdate(req.user.id, {
      interest: interest,
    });
    const user = await User.findById(user.id);

    // console.log("user Updated : ", user);

    return res.status(200).json({
      message: "user found please keep token secret",
      success: true,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

module.exports.addFavNews = async (req, res) => {
  try {
    const { news } = req.body;
    const user = await User.findById(req.user);
    // console.log(user);
    const data =await JSON.parse(news)
    console.log( data);

    await Favourite.create({ data, user: user.id });
    const getNews = await Favourite.findOne({ data });
    user.favourite.unshift(getNews.id);

    await user.save();
    return res.status(200).json({
      message: "news added to favourite",
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

module.exports.removeFavNews = async (req, res) => {
  try {
    const { newsId } = req.query;

    if (!newsId) {
      return res.status(400).json({
        message: "Please provide id for news",
      });
    }
    const user = await User.findOne(req.user);
    const news = await Favourite.findById(newsId);
    await Favourite.deleteOne(news);

    // user.favourite.unshift(newsNews.id);
    const favourite = user.favourite;
    const index = favourite.indexOf(newsId);
    favourite.splice(index, 1);
    user.updateOne({ favourite });

    await user.save();
    return res.status(200).json({
      message: "news removed from favourite",
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};
