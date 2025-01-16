const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");
const cookieParser = require("cookie-parser");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");
const app = express();
app.use("/", express.json());
app.use("/", cookieParser());

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const ALLOWED_STATUS = ["ignored", "interested"];
      if (!ALLOWED_STATUS.includes(status)) throw new Error("Invalid status");
      const toUser = await User.findOne({ _id: toUserId });
      if (!toUser) throw new Error("user does not exist");
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest)
        throw new Error("Connection request already exists");
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.send({
        message: "connection request",
        data: data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const { requestId, status } = req.params;
      const ALLOWED_STATUS = ["accepted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) throw new Error("Invalid status");
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      });
      if (!connectionRequest) throw new Error("Connection request not found");
      connectionRequest.status = status;
      await connectionRequest.save();
      res.send({
        message: "connection request " + status,
        data: connectionRequest,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
