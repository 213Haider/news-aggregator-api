const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { urlencoded } = require("express");
const routes = require("express").Router;
const mongoose = require("mongoose");
const { signUp, signIn } = require("./src/controllers/authController");
const verifyToken = require("./middleware/authJWT");
const user = require("./models/user");
require("dotenv").config();

const app = express();
const port = 3200;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(routes);

// routes.use(bodyParser.urlencoded({ extended: false }));
// routes.use(bodyParser.json());

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

app.post("/signin", verifyToken, signIn, (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "INVALID JWT TOKEN",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  }
  res.status(200);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
