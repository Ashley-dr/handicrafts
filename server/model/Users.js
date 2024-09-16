const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Users = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],

    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  fullname: {
    type: String,
    required: [true, "Full name Required"],
  },
  phoneNumber: {
    type: String,
  },
  resetToken: { type: String },
  resetTokenExpiration: { type: String },
});

// Users.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

module.exports = mongoose.model("Users", Users);
