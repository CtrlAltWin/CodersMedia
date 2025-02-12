const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/Auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");
userRouter.get("/user/request/recieved/pending", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested",
    })
      .populate("fromUserId", "firstName lastName age about photoURL")
      .populate("toUserId", "firstName lastName age about photoURL");
    const data = pendingRequests.map((Request) => {
      return {
        requestId: Request._id,
        sender: Request.fromUserId,
      };
    });
    res.send({
      message: data.length + " pending requests",
      requests: data,
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
      status: "accepted",
    })
      .populate("fromUserId", "firstName lastName age about photoURL")
      .populate("toUserId", "firstName lastName age about");
    const data = connections.map((connection) => {
      const person = connection.fromUserId._id.equals(loggedInUserId)
        ? connection.toUserId
        : connection.fromUserId;
      return person;
    });
    res.send({ message: data.length + " connections", connections: data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "skills",
  "photoURL",
  "about",
  "gender",
];

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
