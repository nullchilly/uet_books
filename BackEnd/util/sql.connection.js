mysql = require("mysql");

const sqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin12345",
  database: "uet_book_db",
});

sqlConnection.connect((er) => {
  if (er) {
    console.log(er);
  } else {
    console.log("Database connected");
  }
});

module.exports = sqlConnection;
