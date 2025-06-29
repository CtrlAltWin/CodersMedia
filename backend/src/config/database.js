const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;
const connectDB = async () => {
  return await mongoose.connect(mongoUri);
};

module.exports = {
  connectDB,
};
