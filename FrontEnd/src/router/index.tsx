import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/SignUp/SignUpPage";
import HomePage from "../pages/UserPage/HomePage";
import MyShelfPage from "../pages/UserPage/MyShelfPage";
import SearchPage from "../pages/UserPage/SearchPage";

const publicRoutes = [
  {
    path: "/",
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
];

export { publicRoutes, privateUserRoutes };
