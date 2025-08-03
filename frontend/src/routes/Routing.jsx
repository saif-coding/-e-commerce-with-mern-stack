import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import UserUpdate from "../pages/UserUpdate";
import Dashboard from "../pages/Dashboard";
import AdminProducts from "../components/AdminProducts";
import AddProduct from "../components/AddProduct";
import OrdersList from "./../components/OrdersList";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import UpdateProduct from "../components/UpdateProduct";
import Cart from "../pages/Cart";
import ReviewsLists from "../components/ReviewsLists";
import SpicficCategory from "../components/SpicficCategory";
import MainDashboard from "../pages/MainDashboard";
import Address from "../components/Address";
import AddressUpdate from "../components/AddressUpdate";
import Order from "../pages/Order";
import { UserContext } from "../context/UserContext";
function Routing() {
  const { singleUser } = useContext(UserContext);
  const isAdmin = singleUser.role === "admin";
  const isUser = singleUser.role === "user";
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={singleUser ? <UserProfile /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/update/:id"
        element={singleUser ? <UserUpdate /> : <Navigate to={"/login"} />}
      />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/product-details/:slug" element={<ProductDetails />} />
      <Route path="/product-update/:title" element={<UpdateProduct />} />
      <Route
        path="/cart"
        element={isAdmin || isUser ? <Cart /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/reviewlist"
        element={singleUser ? <ReviewsLists /> : <Navigate to={"/login"} />}
      />
      <Route path="/category/:cate" element={<SpicficCategory />} />
      <Route
        path="/address"
        element={singleUser ? <Address /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/address-update"
        element={singleUser ? <AddressUpdate /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/order"
        element={singleUser ? <Order /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/dashboard"
        element={isAdmin ? <Dashboard /> : <Navigate to="/" replace />}
      >
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/dashboard/productlist" element={<AdminProducts />} />
        <Route path="/dashboard/addproduct" element={<AddProduct />} />
        <Route path="/dashboard/orders" element={<OrdersList />} />
        {/* <Route path="/dashboard/settings" element={<Settings />} />  */}
      </Route>
    </Routes>
  );
}

export default Routing;
