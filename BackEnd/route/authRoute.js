const {
  Login,
  Register,
  DeleteUser,
  UpdateUser,
  GetAllUser,
  GetUserById,
  AddAdminAccount,
} = require("../controller/authController");

const authRouter = require("express").Router();
const loginApi = "/login";
const registerApi = "/register";
const deleteApi = "/deleteUser";
const updateApi = "/updateUser";
const getUserByIDApi = "/getUserByID/:id";;
const AddAdminAccountApi = "/addAdminAccount";
const getAllUserApi = "/getAllUser/:token";
authRouter.post(loginApi, Login);
authRouter.post(registerApi, Register);
authRouter.post(deleteApi, DeleteUser);
authRouter.post(updateApi, UpdateUser);

authRouter.get(getAllUserApi, GetAllUser);
authRouter.get(getUserByIDApi, GetUserById);
authRouter.post(AddAdminAccountApi, AddAdminAccount);

module.exports = authRouter;
