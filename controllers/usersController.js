const Favourite = require("../models/favourite");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// FOR CREATING THE USER / Account
module.exports.createUser = async (req, res) => {
  try {
    // DESTRUCTURE FROM req BODY
    const { email, name, password, confirm_password } = req.body;
    // if any of them not found
    if (!email || !name || !password || !confirm_password) {
      return res.status(400).json({
        message: "Please fill the required fields",
        success: false,
      });
    }
    // If Password not Match with Confirm_password
    if (password !== confirm_password) {
      return res.status(401).json({
        message: "Password and confirm_password not matches",
        success: false,
      });
    }
    // Finfing the User base on email
    const user = await User.findOne({ email });
    // if user Exist?
    if (user) {
      return res.status(409).json({
        message: "User already exist",
        success: false,
      });
    }
    // if user not exist
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

// Used to login / Send token
module.exports.findUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Finding the user from email and populate the favourite
    const user = await User.findOne({ email }).populate("favourite");
    // If user exist and password not Matches ?
    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // if user found? Create a Token
    const token = jwt.sign(
      JSON.stringify({
        name: user.name,
        email: user.email,
        id: user._id,
        favourite: user.favourite,
        interest: user.interest,
      }),
      process.env.SECRET_KEY,
      {
        algorithm: process.env.ENCRYPT_ALGORITHM,
      }
    );
    // Sending the success response
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

// Update the user Interest to db
module.exports.updateUserInterest = async (req, res) => {
  try {
    // storing the user interest in variable
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

    // Updating the user's Interest field
    await User.findByIdAndUpdate(req.user.id, {
      interest: interest,
    });

    return res.status(200).json({
      message: "User Interest Updated successfull..",
      success: true,
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

// ADDING THE NEWS TO FAVOURITE AND UPDATE THE USER'S FAVOURITE ARRAY
module.exports.addFavNews = async (req, res) => {
  try {
    const { news } = req.body;
    // const data = await JSON.parse(news);
    if (!news.source.id) {
      news.source.id = null;
    }

    const response = await Favourite.findOne({ data: news });
    if (response) {
      return res.status(409).json({
        message: "News Already Exist in Favourite",
        success: false,
      });
    }
    const user = await User.findById(req.user);

    await Favourite.create({ data: news, user: user.id });
    const getNews = await Favourite.findOne({ data: news });
    user.favourite.unshift(getNews.id);

    await user.save();

    return res.status(200).json({
      message: "news added to favourite",
      data: getNews,
      success: true,
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};

// finding the list of favourite news from favourite model
module.exports.getFavNews = async (req, res) => {
  try {
    // finding the user based on id
    const user = await User.findById(req.user._id);
    // if user exist
    if (user) {
      // find favoutite  and send to response
      const fav = await Favourite.find({ user: user._id });

      return res.status(200).json({
        message: "all favourite news of user",
        success: true,
        data: fav,
      });
    } else {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// REMOVING THE FAVOURITE NEWS FROM FAVOURITE MODEL AND FROM USER'S FAVOURITE ARRAY
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
