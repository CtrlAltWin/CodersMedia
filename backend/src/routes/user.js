const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/Auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");

userRouter.get("/user/request/recieved/pending", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested",
    })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");
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
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");
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

module.exports = userRouter;
