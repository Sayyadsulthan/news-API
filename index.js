const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = 8000;
const app = express();
const db = require("./config/db");
// const passport = require("passport");
// const passportJWT = require("passport-jwt");
const passportJWT = require("./config/jwtStrategy");
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log("app is running on server port :", port);
});
