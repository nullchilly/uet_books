const {Login, Register, DeleteUser} = require("../controller/authController");

const authRouter = require("express").Router();
const loginApi = "/login"
const registerApi = "/register"
const deleteApi = "/deleteUser"
authRouter.post(loginApi, Login);
authRouter.post(registerApi, Register);
authRouter.post(deleteApi, DeleteUser);


module.exports = authRouter