import React from "react";
import Auth from "./Auth.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Info from "./Info.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext.jsx";

const App = () => {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>This is a navbar</h1>
                <Outlet />
              </div>
            }
          >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route element={<Auth />}>
              <Route path="info" element={<Info />} /> {/* Protected route */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
};

export default App;
