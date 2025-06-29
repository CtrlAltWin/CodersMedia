const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();
const jwtSecret = process.env.JWT_SECRET;
app.use("/", express.json());
app.use("/", cookieParser());

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const userAlreadyExists = await User.findOne({ emailId: req.body.emailId });
    if (userAlreadyExists) throw new Error("email id already exists");
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    req.body.password = passwordHash;
    const user = new User(req.body);
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid credentials");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Invalid credentials");
    const token = jwt.sign(
      {
        _id: user.id,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.send(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.send("user logged out successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = authRouter;
