const {Login, Register, DeleteUser, UpdateUser, GetAllUser, GetUserByID} = require("../controller/authController");

const authRouter = require("express").Router();
const loginApi = "/login"
const registerApi = "/register"
const deleteApi = "/deleteUser"
const updateApi = "/updateUser"
const getUserByIDApi = "/getUserByID"
authRouter.post(loginApi, Login);
authRouter.post(registerApi, Register);
authRouter.post(deleteApi, DeleteUser);
authRouter.post(updateApi, UpdateUser);

authRouter.get("/getAllUser", GetAllUser);
authRouter.get(getUserByIDApi, GetUserByID);


module.exports = authRouter