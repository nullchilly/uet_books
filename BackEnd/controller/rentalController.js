const sqlConnection = require("../util/sql.connection");

module.exports.addRental = async (req, res) => {
    const { userId, bookMongoId } = req.body;
    const bookInfo = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT id, price FROM book WHERE mongoId = ?",
            [bookMongoId],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
    console.log(bookInfo);
    if (bookInfo.length == 0) {
        return res.status(400).json({ msg: "book not found" });
    }
    const rentalInfo = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT * FROM rental WHERE userId = ? AND bookId = ?",
            [userId, bookInfo[0].id],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
    if (rentalInfo.length > 0) {
        return res.status(400).json({ msg: "book already rental" });
    }
    const result = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "INSERT INTO rental (userId, bookId, rentalDate, lastUpdate) VALUES (?, ?, NOW(), NOW())", [userId, bookInfo[0].id],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
    console.log(result);
    if (result.affectedRows > 0) {
        return res.status(200).json({ msg: "addRental success" });
    }
    else {
        return res.status(200).json({ msg: "addRental failed" });
    }
}