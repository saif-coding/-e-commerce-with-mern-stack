import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import UserUpdate from "../pages/UserUpdate";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/update/:id" element={<UserUpdate />} />
    </Routes>
  );
}

export default Routing;
