const sqlConnection = require("../util/sql.connection");

module.exports.addRental = async (req, res) => {
    const { userId, bookMongoId, price } = req.body;
    const bookInfo = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT id FROM book WHERE mongoId = ?",
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
    const parsePrice = parseFloat(price);
    console.log(parsePrice);
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
    const rentalID = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT id FROM rental WHERE userId = ? AND bookId = ?",
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

    const parseRentalId = parseInt(rentalID[0].id);
    const userBuget = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT budget FROM user WHERE id = ?",
            [userId],
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
    if (parsePrice > rentalID[0].budget) {
        return res.status(400).json({ msg: "not enough budget" });
    }

    const newBudget = parseFloat(userBuget[0].budget) - parsePrice;
    const addPayment = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "INSERT INTO payments (rentalId, amount, paymentDate, userId) VALUES (?, ?, NOW(), ?)",
            [parseRentalId, parsePrice, userId],
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
    const updateUserBudget = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "UPDATE user SET budget = ? WHERE id = ?",
            [newBudget, userId],
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



    if (result.affectedRows > 0&& addPayment.affectedRows > 0 && updateUserBudget.affectedRows > 0) {
        return res.status(200).json({ msg: "addRental success" });
    }
    else {
        return res.status(200).json({ msg: "addRental failed" });
    }
}

module.exports.addBudget = async (req, res) => {
    const { userId, amount } = req.body;
    const budget = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT budget FROM user WHERE id = ?",
            [userId],
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
    if (budget.length == 0) {
        return res.status(400).json({ msg: "user not found" });
    }
    const parsedBudget = parseFloat(budget[0].budget); // Chuyển đổi giá trị budget thành integer
    const parseAmount = parseFloat(amount);
    console.log(parsedBudget, parseAmount);
    const newBudget = parsedBudget + parseAmount;
    const result = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "UPDATE user SET budget = ? WHERE id = ?",
            [newBudget, userId],
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
    if (result.affectedRows > 0) {
        return res.status(200).json({ msg: "addBudget success" });
    }
    else {
        return res.status(200).json({ msg: "addBudget failed" });
    }
}

module.exports.queryRentalBookByUser = async (req, res) => {
    const { userId } = req.body;
    const rentalInfo = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT b.mongoId FROM rental r JOIN book b On r.bookId = b.id WHERE r.userId = ?;",
            [userId],
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
    console.log(rentalInfo);
    if (rentalInfo.length == 0) {
        return res.status(400).json({ msg: "rental not found" });
    }
    return res.status(200).json({ rentalInfo });
}