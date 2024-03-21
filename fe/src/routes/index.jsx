import AdminPage from "~/pages/AdminPage";
import AdminLab from "~/pages/AdminPage/AdminLab";
import LabDetails from "~/pages/AdminPage/AdminLab/AdminLabDetails";
import AdminLib from "~/pages/AdminPage/AdminLib";
import LibDetails from "~/pages/AdminPage/AdminLib/AdminLibDetails";
import AdminPenalty from "~/pages/AdminPage/AdminPenalty";
import PenaltyDetails from "~/pages/AdminPage/AdminPenalty/AdminPenaltyDetails";
import Books from "~/pages/AdminPage/AdminBook";
import AdminUser from "~/pages/AdminPage/AdminUser";
import UserAdminDetails from "~/pages/AdminPage/AdminUser/UserAdminPage";
import UserLabDetails from "~/pages/AdminPage/AdminUser/UserLabPage";
import UserLibDetails from "~/pages/AdminPage/AdminUser/UserLibPage";
import UserPenaltyDetails from "~/pages/AdminPage/AdminUser/UserPenaltyPage";
import LabPage from "~/pages/LabPage";
import LabDelivery from "~/pages/LabPage/LabDelivery";
import LabPenalty from "~/pages/LabPage/LabPenalty";
import LabImport from "~/pages/LabPage/LabImport";
import LabBook from "~/pages/LabPage/LabBook";
import LabRent from "~/pages/LabPage/LabRent";
import LabStorage from "~/pages/LabPage/LabStorage";
import LibPage from "~/pages/LibPage";
import LibDelivery from "~/pages/LibPage/LibDelivery";
import LibExport from "~/pages/LibPage/LibExport";
import LibPenalty from "~/pages/LibPage/LibPenalty";
import LibImport from "~/pages/LibPage/LibImport";
import LibStorage from "~/pages/LibPage/LibStorage";
import PenaltyPage from "~/pages/PenaltyPage";
import PenaltyDelivery from "~/pages/PenaltyPage/PenaltyDelivery";
import PenaltyBook from "~/pages/PenaltyPage/PenaltyBook";
import LoginPage from "~/pages/LoginPage";

const publicRoutes = [
    {
        path: '/',
        component: LoginPage,
    },
];

const privateAdminRoutes = [
    // Admin page
    {
        path: '/Admin',
        component: AdminPage,
    },
    {
        path: '/Admin/user',
        component: AdminUser,
    },
    {
        path: '/Admin/adminUsers',
        component: UserAdminDetails,
    },
    {
        path: '/Admin/labUsers',
        component: UserLabDetails,
    },
    // {
    //     path: '/Admin/penaltyUsers',
    //     component: UserPenaltyDetails,
    // },
    {
        path: '/Admin/libUsers',
        component: UserLibDetails,
    },
    {
        path: '/Admin/lib',
        component: AdminLib,
    },
    {
        path: '/Admin/lib/:id',
        component: LibDetails,
    },
    {
        path: '/Admin/lab',
        component: AdminLab,
    },
    {
        path: '/Admin/lab/:id',
        component: LabDetails,
    },
    {
        path: '/Admin/rentPenalty',
        component: AdminPenalty,
    },
    {
        path: '/Admin/rentPenalty/:id',
        component: PenaltyDetails,
    },
    {
        path: '/Admin/books',
        component: Books,
    },
];

const privateLibRoutes = [
    {
        path: '/Lib',
        component: LibPage,
    },
    {
        path: '/Lib/storage',
        component: LibStorage,
    },
    {
        path: '/Lib/import',
        component: LibImport,
    },
    {
        path: '/Lib/export',
        component: LibExport,
    },
    {
        path: '/Lib/delivery',
        component: LibDelivery,
    },
    {
        path: '/Lib/penalty',
        component: LibPenalty,
    },
];

const privateLabRoutes = [
    {
        path: '/Lab',
        component: LabPage,
    },
    {
        path: '/Lab/book',
        component: LabBook,
    },
    {
        path: '/Lab/storage',
        component: LabStorage,
    },
    {
        path: '/Lab/import',
        component: LabImport,
    },
    {
        path: '/Lab/rent',
        component: LabRent,
    },
    {
        path: '/Lab/delivery',
        component: LabDelivery,
    },
    {
        path: '/Lab/rentPenalty',
        component: LabPenalty,
    },
];

const privatePenaltyRoutes = [
    {
        path: '/',
        component: PenaltyPage,
    },
    {
        path: '/Penalty',
        component: PenaltyPage,
    },
    {
        path: '/Penalty/delivery',
        component: PenaltyDelivery,
    },
    {
        path: '/Penalty/book',
        component: PenaltyBook,
    },
];



export { publicRoutes, privateAdminRoutes, privateLibRoutes, privateLabRoutes,  privatePenaltyRoutes};
