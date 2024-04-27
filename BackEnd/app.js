const express = require("express");
const sqlConnection = require("./util/sql.connection");
const authRouter = require("./route/authRoute");
const userRoute = require("./route/userRoute");
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
app.use(express.json());
app.use("/", authRouter);
app.use("/user", userRoute);
