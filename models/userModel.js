const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "username required"],
  },
  email: {
    type: String,
    require: [true, "user email required"],
  },
  password: {
    type: String,
    require: [true, "password required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
