const sqlConnection = require("../util/sql.connection");
const bcrypt = require("bcrypt");
const validator = require("validator");
// const { use } = require("../route/authRoute");
module.exports.Login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ msg: "Invalid Email" });
        }

        const user = await sqlConnection.query("SELECT * FROM user WHERE usr_name = ?", [username]);
        const admin = await sqlConnection.query("SELECT * FROM admin WHERE usr_name = ?", [username]);
        console.log(user._results, "user");
        console.log(admin._results, "admin");
        if (user.length === 0 && admin.length === 0) {
            return res.status(400).json({ msg: "user not found" });
        }

        if (user.length !== 0) {
            const isMatch = await bcrypt.compare(password, user[0].password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Password" });
            } else {
                return res.status(200).json({
                    id: user[0].id,
                    role: "user",
                    name: user[0].fullName,
                    email: user[0].email,
                    idPage: 0,
                    msg: "Login success"
                });
            }
        } else if (admin.length !== 0) {
            const isMatch = await bcrypt.compare(password, admin[0].password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Password" });
            } else {
                return res.status(200).json({
                    id: admin[0].id,
                    role: "admin",
                    name: admin[0].fullName,
                    email: admin[0].email,
                    idPage: 0,
                    msg: "Login success"
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}

module.exports.Register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, fullName, password } = req.body;
        if (!username) {
            return res.status(400).json({ msg: "Please enter your email" });
        }
        if (!fullName) {
            return res.status(400).json({ msg: "Please enter your name" });
        }
        if (!password) {
            return res.status(400).json({ msg: "Please enter your password" });
        }

        const result = await sqlConnection.query("Insert into user (usr_name, fullName, password) values (?, ?, ?)", [username, fullName, password]);
        // console.log(result)
        if (result != null) {
            return res.status(200).json({ msg: "Register success" });
        } else {
            return res.status(400).json({ msg: "Register failed" });
        }
    } catch (error) {
        console.log(error);
    }
}  