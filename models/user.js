var mongoose = require("mongoose");
Schema = mongoose.Schema;

var userSchema = new Schema({
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
        return `r'^[\w\.-]+@[\w\.-]+\.\w+$'`;
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
