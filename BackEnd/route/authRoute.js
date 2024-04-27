const {Login, Register, DeleteUser, UpdateUser, GetAllUser} = require("../controller/authController");

const authRouter = require("express").Router();
const loginApi = "/login"
const registerApi = "/register"
const deleteApi = "/deleteUser"
const updateApi = "/updateUser"
authRouter.post(loginApi, Login);
authRouter.post(registerApi, Register);
authRouter.post(deleteApi, DeleteUser);
authRouter.post(updateApi, UpdateUser);
authRouter.get("/getAllUser", GetAllUser);


module.exports = authRouter