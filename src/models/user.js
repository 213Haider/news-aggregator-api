const mongoose = require("mongoose");
const { object } = require("webidl-conversions");
Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  preferences: {
    type: Array,
    default: [
      "Political News",
      "Tech News",
      "Health News",
      "Sport News",
      "Business News",
    ],
  },

  firstName: {
    type: String,
    required: [true, "Firstname not provided"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Lastname not provided"],
    trim: true,
  },
  fullName: {
    type: String,
    required: [true, "Fullname not provided"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    trim: true,
    required: [true, "Email not provided"],
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "Email provided is incorrect",
    },
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
