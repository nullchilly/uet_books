const sqlConnection = require("../util/sql.connection");

module.exports.AddFavouriteBook = async (req, res) => {
    const { bookId, userId } = req.body;
    const isUser = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT username FROM user WHERE id = ?",
            [userId],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    })
    if (isUser.length == 0) {
        return res.status(400).json({ msg: "user not found" });
    }
    const isBook = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT id FROM book WHERE mongoId = ?",
            [bookId],
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
    // console.log(isBook);
    if (isBook.length == 0) {
        return res.status(400).json({ msg: "book not found" });
    }
    // return res.status(400).json({ msg: "book not found111" });
    const favourite = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT * FROM favourite_book WHERE bookId = ? AND userId = ?",
            [isBook[0].id, userId],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            })
    });
    if (favourite.length > 0) {
        return res.status(400).json({ msg: "already favourite" });
    }
    const result = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "INSERT INTO favourite_book (bookId, userId) VALUES (?, ?)",
            [isBook[0].id, userId],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
    if (result) {
        return res.status(200).json({ msg: "success add favourite" });
    } else {
        return res.status(400).json({ msg: "failed ad   d favourite" });
    }
}

module.exports.DeleteFavouriteBook = async (req, res) => {
    const { bookId, userId } = req.body;
    const isBook = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT id FROM book WHERE mongoId = ?",
            [bookId],
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
    const result = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "DELETE FROM favourite_book WHERE bookId = ? AND userId = ?",
            [isBook[0].id, userId],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
    if (result) {
        return res.status(200).json({ msg: "success delete favourite" });
    } else {
        return res.status(400).json({ msg: "failed delete favourite" });
    }
}

module.exports.getFavouriteBooks = async (req, res) => {
    const userId = req.params.userId;
    const result = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT b.mongoId FROM favourite_book f JOIN book b ON f.bookId = b.id WHERE f.userId = ?",
            [userId],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    })
    if (result.length == 0) {
        return res.status(400).json({ msg: "no favourite book" });
    }
    else{
        return res.status(200).json(result);}
}

module.exports.getUserInfoByName = async (req, res) => {
    const userName = req.params.username;
    const result = await new Promise((resolve, reject) => {
        sqlConnection.query(
            "SELECT * FROM user WHERE username = ?",
            [userName],
            (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    })
    if (result.length == 0) {
        return res.status(400).json({ msg: "user not found" });
    }
    return res.status(200).json(result);
}