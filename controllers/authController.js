const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

exports.authCheck = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json({
        message: "You are not logged in! Please log in to create employee.",
      });
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      "my-ultra-secure-secret-key"
    );

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(400).json({
        message: "The user belonging to this token does no longer exist.",
      });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};
