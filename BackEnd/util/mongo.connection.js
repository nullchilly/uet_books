const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected to MongoDB");
} catch (err) {
  console.log("Cant connect to MongoDB");
}
