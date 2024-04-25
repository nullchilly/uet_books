const {Login, Register, DeleteUser, UpdateUser} = require("../controller/authController");

const authRouter = require("express").Router();
const loginApi = "/login"
const registerApi = "/register"
const deleteApi = "/deleteUser"
const updateApi = "/updateUser"
authRouter.post(loginApi, Login);
authRouter.post(registerApi, Register);
authRouter.post(deleteApi, DeleteUser);
authRouter.post(updateApi, UpdateUser);


module.exports = authRouter