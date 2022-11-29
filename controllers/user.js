const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//signup api
exports.signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    password = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password });
    createSendToken(user, 201, res, "signup success");
  } catch (error) {
    console.log(error);
    res.json({ message: "Signup fail", error });
  }
};

//login api
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("Email and password required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "No user found with this credentials" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      createSendToken(user, 200, res, "login success");
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "login fail", error });
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, "my-ultra-secure-secret-key", {
    expiresIn: "2h",
  });
};
const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);
  //   const cookieOptions = {
  //     expires: new Date(Date.now() + "2h" * 24 * 60 * 60 * 1000),
  //   };
  //   res.cookie("jwt", token, cookieOptions);
  //   // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    message,
    data: {
      user,
    },
  });
};
