const sqlConnection = require("../util/sql.connection");

module.exports.addRental = async (req, res) => {
    return res.status(200).json({ msg: "addRental" });
}