import AccountManagementPage from "../pages/AdminPage/AccountManager";
import BookManagementPage from "../pages/AdminPage/BookManager";
import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/SignUp/SignUpPage";
import HomePage from "../pages/UserPage/HomePage";
import MyShelfPage from "../pages/UserPage/MyShelfPage";
import ProfilePage from "../pages/UserPage/ProfilePage";
import SearchPage from "../pages/UserPage/SearchPage";
import AuthScreen from "../pages/Auth";

const publicRoutes = [
  {
    path: "/",
    component: AuthScreen,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: SignUpPage,
  },
];
const privateUserRoutes = [
  {
    path: "/user/home",
    component: HomePage,
  },
  {
    path: "/user/search",
    component: SearchPage,
  },
  {
    path: "/user/myshelf",
    component: MyShelfPage,
  },
  {
    path: "/user/profile",
    component: ProfilePage,
  },
];
const privateAdminRoutes = [
  {
    path: "/admin/home",
    component: HomePage,
  },
  {
    path: "admin/accountmanagement",
    component: AccountManagementPage,
  },
  {
    path: "/admin/bookmanagement",
    component: BookManagementPage,
  },
];
export { publicRoutes, privateUserRoutes, privateAdminRoutes };
