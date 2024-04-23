const {Login, Register} = require("../controller/authController");

const authRouter = require("express").Router();
const loginApi = "/login"
const registerApi = "/register"
authRouter.post(loginApi, Login);
authRouter.post(registerApi, Register);


module.exports = authRouter