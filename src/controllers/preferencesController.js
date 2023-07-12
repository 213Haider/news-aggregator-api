const User = require("../models/user");

const getPreferences = (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "INVALID JWT TOKEN",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  }
  User.findById(req.user.id).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).send(user.preferences);
  });
};

const putPreferences = (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "INVALID JWT TOKEN",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  }

  const userid = req.user.id;
  const { preferences } = req.body;
  User.findByIdAndUpdate(userid, { preferences }, { new: true }).then(
    (user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    }
  );
};

module.exports = { getPreferences, putPreferences };
