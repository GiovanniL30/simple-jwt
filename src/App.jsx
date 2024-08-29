import React from "react";
import Auth from "./Auth.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const App = () => {
  return (
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
            <Route path="info" element={<h1>Secret Info</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
