import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateAdminRoutes, privateUserRoutes, publicRoutes } from "./router";
import "./App.css";
import SideBarUser from "./components/User/components/SideBar";
import TopBarUser from "./components/User/components/TopBar";
import SideBarAdmin from "./components/Admin/components/SideBar";
import TopBarAdmin from "./components/Admin/components/TopBar";

function App() {
  return (
    <Router>
      <div className="App">
        {localStorage.getItem("role") === "user" ? (
          <>
            <SideBarUser />
            <TopBarUser />

            <Routes>
              {privateUserRoutes.map((route, i) => {
                return (
                  <Route
                    key={i}
                    path={route.path}
                    element={<route.component />}
                  />
                );
              })}
            </Routes>
          </>
        ) : localStorage.getItem("role") === "admin" ? (
          <>
            <SideBarAdmin />
            <TopBarAdmin />

            <Routes>
              {privateAdminRoutes.map((route, i) => {
                return (
                  <Route
                    key={i}
                    path={route.path}
                    element={<route.component />}
                  />
                );
              })}
            </Routes>
          </>
        ) : (
          <Routes>
            {publicRoutes.map((route, i) => {
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
          </Routes>
        )}
      </div>
    </Router>
  );
}
export default App;
