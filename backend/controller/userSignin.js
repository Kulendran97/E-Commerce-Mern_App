const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please enter email");
    }
    if (!password) {
      throw new Error("Please enter password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log("checkpassword", checkPassword);

    if (checkPassword) {
      console.log("login success");
      res.json({
        name: user.name,
        message: checkPassword.message,
        error: false,
        success: true,
      });
    } else {
      throw new Error("Please check Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
