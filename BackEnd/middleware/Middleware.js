require("dotenv").config();
const jwt = require("jsonwebtoken");
const sqlConnection = require("../util/sql.connection");

module.exports.adminVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: "false" });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async(err, data) => {
        if (err) {
            return res.status(401).json({ msg: "false" });
        }
        const result = await sqlConnection.query("SELECT * FROM admin WHERE username = ?", [data.username]);
        if (!result[0]) {
            return res.status(401).json({ msg: "false" });
        }
        return res.status(200).json({ msg: "true" });
    })
}