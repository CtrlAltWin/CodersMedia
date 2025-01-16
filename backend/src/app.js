const express = require("express");
const { connectDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", express.json());
app.use("/", cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is successfully listening on the port 3000");
    });
  })
  .catch((err) => {
    console.log("Server is not listening:" + err.message);
  });
