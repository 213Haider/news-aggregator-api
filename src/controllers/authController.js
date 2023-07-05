const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
// const user = require("../../models/user");

var signUp = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user
    .save()
    .then((data) => {
      return res.status(200).send({
        message: "User registered successfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err,
      });
    });
};

const signIn = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          accessToken: null,
          message: "User not found",
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password",
        });
      }
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).send({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
        },
        message: "Login Successfull",
        accessToken: token,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err,
      });
    });
};

module.exports = { signUp, signIn };
