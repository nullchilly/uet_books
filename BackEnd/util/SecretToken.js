require("dotenv").config;
const jwt = require("jsonwebtoken");

module.exports.createSecretRoleToken = () => {
    return jwt.sign({ role }, process.env.TOKEN_KEY,{
        expiresIn: 1 * 24 * 60 * 60,
    } );
}