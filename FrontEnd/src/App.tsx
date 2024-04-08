import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./router";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, i) => {
            return (
              <Route key={i} path={route.path} element={<route.component />} />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
