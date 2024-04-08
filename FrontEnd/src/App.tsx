import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateUserRoutes, publicRoutes } from "./router";
import "./App.css";
import SideBarUser from "./components/User/components/SideBar";
import TopBarUser from "./components/User/components/TopBar";

function App() {
  return (
    <Router>
      <div className="App">
        {localStorage.getItem("role") === "student" ? (
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
