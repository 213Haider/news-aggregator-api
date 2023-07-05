const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { urlencoded } = require("express");
const routes = require("express").Router;
const mongoose = require("mongoose");
const { signUp, signIn } = require("./src/controllers/authController");
const verifyToken = require("./middleware/authJWT");
const User = require("./models/user");
require("dotenv").config();
const {
  getPreferences,
  putPreferences,
} = require("./src/controllers/preferencesController");
const { fetchNews } = require("./src/controllers/newsController.js");

const app = express();
const port = 3200;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  mongoose.connect("mongodb://localhost:27017/news-db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected to db");
} catch (err) {
  console.log("error occured while connecting to db");
}

app.post("/register", signUp);

app.post("/signin", verifyToken, signIn);

app.get("/preferences", verifyToken, getPreferences);

app.put("/preferences", verifyToken, putPreferences);

app.get("/news", verifyToken, fetchNews);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
