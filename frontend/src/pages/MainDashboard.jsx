import React from "react";
import { FaUsers, FaBox, FaDollarSign, FaShoppingCart } from "react-icons/fa";

const MainDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Revenue" icon={<FaDollarSign />} value="$12,345" />
        <Card title="Total Products" icon={<FaBox />} value="120" />
        <Card title="Total Users" icon={<FaUsers />} value="480" />
        <Card title="Total Orders" icon={<FaShoppingCart />} value="328" />
      </div>

      {/* Overview + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Sales Overview
          </h2>
          <div className="h-60 flex items-center justify-center text-gray-400">
            {/* Chart can be added here (e.g., using recharts, chart.js, etc.) */}
            [ Sales Chart Placeholder ]
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Orders
          </h2>
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3].map((order, i) => (
              <li
                key={i}
                className="py-4 flex justify-between text-sm text-gray-600"
              >
                <span>Order #10{i + 1}</span>
                <span>$99.99</span>
                <span className="text-green-500">Delivered</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, icon, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
    <div className="bg-gray-800 text-white p-3 rounded-full text-lg">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-bold text-gray-700">{value}</h3>
    </div>
  </div>
);

export default MainDashboard;
