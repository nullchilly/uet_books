require("dotenv").config();
const sqlConnection = require("../util/sql.connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { createSecretRoleToken } = require("../util/SecretToken");

module.exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    // const user = await sqlConnection.query("SELECT * FROM user WHERE username = ?", [username]);
    const user = await new Promise((resolve, reject) => {
      sqlConnection.query(
        "SELECT * FROM user WHERE username = ?",
        [username],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    // const admin = await sqlConnection.query("SELECT * FROM admin WHERE username = ?", [username]);
    const admin = await new Promise((resolve, reject) => {
      sqlConnection.query(
        "SELECT * FROM admin WHERE username = ?",
        [username],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    //console.log(user, "user");
    //console.log(admin, "admin");
    let token
    if (user.length === 0) {
      token = createSecretRoleToken("admin");
    } else {
      token = createSecretRoleToken("user");
    }
    if (user.length === 0 && admin.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const foundUser = user.length !== 0 ? user[0] : admin[0];
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({
      id: foundUser.id,
      role: user.length !== 0 ? "user" : "admin",
      username: foundUser.username,
      fullName: foundUser.fullName,
      email: foundUser.email,
      // idPage: 0,
      // idPage: 0,
      msg: "Login success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.Register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, fullName, password, email, address } = req.body;
    if (!username) {
      return res.status(400).json({ msg: "Please enter your email" });
    }
    if (!fullName) {
      return res.status(400).json({ msg: "Please enter your name" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Please enter your password" });
    }
    if (!email) {
      return res.status(400).json({ msg: "Please enter your email" });
    }
    if (!address) {
      return res.status(400).json({ msg: "Please enter your address" });
    }
    const existingUser = await new Promise((resolve, reject) => {
      sqlConnection.query(
        "SELECT * FROM user WHERE username = ?",
        [username],
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
    console.log(existingUser);
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await sqlConnection.query(
      "INSERT INTO user (username, fullName, password, email, address, budget) VALUES (?, ?, ?, ?,?, 0)",
      [username, fullName, hashedPassword, email, address]
    );

    if (result != null) {
      return res.status(200).json({ msg: "Register success" });
    } else {
      return res.status(400).json({ msg: "Register failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.DeleteUser = async (req, res) => {
  if (!req.cookies.token) {
    return res.json({ status: false, message: "Please login first" });
  }
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ msg: "false" });
      }
    })
    const { id } = req.body;
    const result = await new Promise((resolve, reject) => {
      sqlConnection.query(
        "DELETE FROM user WHERE id = ?",
        [id],
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

    if (result != null) {
      return res.status(200).json({ msg: "Delete success" });
    } else {
      return res.status(400).json({ msg: "Delete failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.UpdateUser = async (req, res) => {
  if (!req.cookies.token) {
    return res.json({ status: false, message: "Please login first" });
  }
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ msg: "false" });
      }
    })
    console.log(req.body);
    const { id, updates } = req.body;

    const updateClauses = [];
    const updateValues = [];

    for (const key in updates) {
      if (["username", "phone", "address", "email", "fullName"].includes(key)) {
        updateClauses.push(`${key} = ?`);
        updateValues.push(updates[key]);
      }
    }

    if (updateClauses.length === 0) {
      return res.status(400).json({ msg: "No valid updates provided" });
    }

    const sqlQuery = `UPDATE user SET ${updateClauses.join(", ")} WHERE id = ?`;
    updateValues.push(id);

    const updatedUser = await new Promise((resolve, reject) => {
      sqlConnection.query(sqlQuery, updateValues, (error, result) => {
        if (error) {
          console.error("Error executing SQL query:", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    if (updatedUser != null) {
      return res.status(200).json({ msg: "Update success" });
    } else {
      return res.status(400).json({ msg: "Update failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.GetAllUser = async (req, res) => {
  if (!req.cookies.token) {
    return res.json({ status: false, message: "Please login first" });
  }
  console.log(req)
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ msg: "false" });
      }
    })
    const result = await new Promise((resolve, reject) => {
      sqlConnection.query("SELECT * FROM user", (error, result) => {
        if (error) {
          console.error("Error executing SQL query:", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    console.log(result);
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await new Promise((resolve, reject) => {
      sqlConnection.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
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
    console.log(result);
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.AddAdminAccount = async (req, res) => {
  try {
    console.log(req.body);
    const { username, fullName, password, email, address } = req.body;
    if (!username) {
      return res.status(400).json({ msg: "Please enter your email" });
    }
    if (!fullName) {
      return res.status(400).json({ msg: "Please enter your name" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Please enter your password" });
    }
    if (!email) {
      return res.status(400).json({ msg: "Please enter your email" });
    }
    if (!address) {
      return res.status(400).json({ msg: "Please enter your address" });
    }
    const existingUser = await new Promise((resolve, reject) => {
      sqlConnection.query(
        "SELECT * FROM user WHERE username = ?",
        [username],
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
    console.log(existingUser);
    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await sqlConnection.query(
      "INSERT INTO admin (username, fullName, password, email, address) VALUES (?, ?, ?, ?,?)",
      [username, fullName, hashedPassword, email, address]
    );

    if (result != null) {
      return res.status(200).json({ msg: "Register success" });
    } else {
      return res.status(400).json({ msg: "Register failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
