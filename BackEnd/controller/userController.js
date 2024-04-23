const sqlConnection = require("../util/sql.connection");

module.exports.searchBook = async (req, res) => {
    return res.status(200).json({ msg: "searchBook" });
}

module.exports.getBooks = async (req, res) => {
    return res.status(200).json({ msg: "getBook" });
}
