const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  try {
    const { email, name, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      return res.status(401).json({
        message: "Password and confirm_password not matches",
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
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      console.log("user not found || invalid credentials");
      console.log("user :", user);
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    return res.status(200).json({
      message: "user found please keep token secret",
      success: true,
    });
  } catch (err) {
    console.log("err :", err);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};
