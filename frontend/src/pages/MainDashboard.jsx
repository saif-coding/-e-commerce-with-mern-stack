import React, { useContext, useState, useEffect } from "react";
import { FaUsers, FaBox, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "./../context/UserContext";
import SalesChart from "../components/SalesChart";
const MainDashboard = () => {
  const { allOrders, getAllOrders, allProductsData } =
    useContext(ProductContext);
  const { allUsers } = useContext(UserContext);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          color="bg-[#3260E6]"
          title="Total Revenue"
          icon={<FaDollarSign />}
          value={allOrders.reduce((acc, curr) => acc + curr.totalAmount, 0)}
          dollar={"$"}
        />
        <Card
          color="bg-[#FFB421]"
          title="Total Products"
          icon={<FaBox />}
          value={allProductsData.length}
        />
        <Card
          color="bg-[#FE2C5F]"
          title="Total Users"
          icon={<FaUsers />}
          value={allUsers?.data?.length}
        />
        <Card
          color="bg-[#8028D4]"
          title="Total Orders"
          icon={<FaShoppingCart />}
          value={allOrders.length}
        />
      </div>

      {/* Overview + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 mb-10">
        {/* Overview Chart Placeholder */}
        <SalesChart />

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl w-96 h-[400px] shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Orders
          </h2>
          <ul className="divide-y divide-gray-200">
            {allOrders.map((order, i) => (
              <li
                key={i}
                className="py-4 flex justify-between text-sm text-gray-600"
              >
                <span>Order #0{i + 1}</span>
                <span className=" font-bold">${order.totalAmount}</span>
                <span
                  className={`text-lg font-semibold ${
                    order.status === "pending"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, icon, value, color, dollar }) => (
  <div
    className={`${color} text-white p-5 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition`}
  >
    <div className=" bg-white text-black p-3 rounded-full text-lg">{icon}</div>
    <div>
      <p className="text-sm font-bold">{title}</p>
      <h3 className="text-xl font-bold">
        {dollar}
        {value}
      </h3>
    </div>
  </div>
);

export default MainDashboard;
