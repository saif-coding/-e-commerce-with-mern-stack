import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import UserUpdate from "../pages/UserUpdate";
import Dashboard from "../pages/Dashboard";
import AdminProducts from "../components/AdminProducts";
import AddProduct from "../components/AddProduct";
import OrdersList from './../components/OrdersList';
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/update/:id" element={<UserUpdate />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/productlist" element={<AdminProducts />} />
        <Route path="/dashboard/addproduct" element={<AddProduct />} />
        <Route path="/dashboard/orders" element={<OrdersList />} />
        {/* <Route path="/dashboard/settings" element={<Settings />} />  */}
      </Route>
    </Routes>
  );
}

export default Routing;
