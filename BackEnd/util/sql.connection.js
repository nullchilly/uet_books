mysql = require("mysql");
require("dotenv").config();

const sqlConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "uet_book_db",
});

sqlConnection.connect((er) => {
  if (er) {
    console.log(er);
  } else {
    console.log("MySQL Database connected");
  }
});

module.exports = sqlConnection;
