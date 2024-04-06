import LoginPage from "../pages/Login/LoginPage";
import SignUpPage from "../pages/SignUp/SignUpPage";

const publicRoutes = [
    {
        path: '/',
        component: LoginPage,
    },
    {
        path: '/register',
        component: SignUpPage,
    },
];





export { publicRoutes};
