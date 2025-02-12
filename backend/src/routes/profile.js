const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/Auth");
const cookieParser = require("cookie-parser");
const validatePassword = require("../utils/validation.js");
const app = express();
const bcrypt = require("bcrypt");
app.use("/", express.json());
app.use("/", cookieParser());

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const { user } = req;
  res.send(user);
});

profileRouter.patch("/profile/Edit", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const allowedEdit = [
      "age",
      "photoURL",
      "about",
      "skills",
      "firstName",
      "lastName",
    ];
    const isEditPossible = Object.keys(req.body).every((key) =>
      allowedEdit.includes(key)
    );
    if (isEditPossible) {
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });
      user.save();
      res.send("user updated successfully");
    } else {
      throw new Error("this is not allowed");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

profileRouter.patch("/updatePassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) throw new Error("password incorrect");
    if (oldPassword == newPassword) throw new Error("same Passwords");
    const isStrongPassword = validatePassword(newPassword);
    if (!isStrongPassword) throw new Error("new password is not strong");
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHash;
    user.save();
    res.send("password updated sucessfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
