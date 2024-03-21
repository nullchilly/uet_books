import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    publicRoutes,
    privateAdminRoutes,
    privateLabRoutes,
    privatePenaltyRoutes,
    privateLibRoutes,
} from './routes';
import './App.css';
import SideBarAdmin from './components/Admin/components/SideBar';
import TopBarAdmin from './components/Admin/components/TopBar';
import SideBarLib from './components/Lib/components/SideBar';
import TopBarLib from './components/Lib/components/TopBar';
import SideBarLab from './components/Lab/components/SideBar';
import TopBarLab from './components/Lab/components/TopBar';
import SideBarPenalty from './components/Penalty/components/SideBar';
import TopBarPenalty from '~/components/Penalty/components/TopBar';

function App() {
    return (
        <Router>
            <div className="App">
                {localStorage.getItem('role') === 'admin' ? (
                    <>
                        <SideBarAdmin />
                        <TopBarAdmin />
                        <Routes>
                            {privateAdminRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : localStorage.getItem('role') === 'lab' ? (
                    <>
                        <SideBarLab />
                        <TopBarLab />
                        <Routes>
                            {privateLabRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : localStorage.getItem('role') === 'penalty' ? (
                    <>
                        <SideBarPenalty />
                        <TopBarPenalty />
                        <Routes>
                            {privatePenaltyRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : localStorage.getItem('role') === 'lib' ? (
                    <>
                        <SideBarLib />
                        <TopBarLib />
                        <Routes>
                            {privateLibRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        {publicRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} element={<route.component />} />;
                        })}
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
