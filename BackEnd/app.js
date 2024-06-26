const express = require("express");
const sqlConnection = require("./util/sql.connection");
const mongoConnection = require("./util/mongo.connection");
const redisConnection = require("./util/redis.connection");
const authRoute = require("./route/authRoute");
const bookRoute = require("./route/bookRoute");
const userRoute = require("./route/userRoute");
const rentalRoute = require("./route/rentalRoute");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
app.use(cors());
app.use(express.json());
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/user/rental", rentalRoute);
app.use("/books", bookRoute);