import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
const ProfileMenu = () => {
  const { setUserCart } = useContext(ProductContext);
  const { setSingleUser, singleUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const result = axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      if ((await result).status === 200) {
        toast.success((await result).data.message);
        setSingleUser("");
        setUserCart("");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="relative group inline-block text-left">
      {/* Profile Avatar or Name */}
      <div className="cursor-pointer flex items-center text-white justify-center w-10 h-10 bg-gray-800 hover:bg-gray-600 transition rounded-full">
        <h1 className=" text-2xl font-semibold">
          {singleUser?.name?.slice(0, 1)}
        </h1>
      </div>

      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 border border-gray-300 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
        <ul className="py-2 text-sm ml-3 text-gray-700">
          <Link
            to={"/profile"}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <FaUser className="text-gray-500 group-hover:text-blue-600" />
            <span className="hover:text-blue-600">Profile</span>
          </Link>
          <Link
            to={"/dashboard"}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <MdDashboard className="text-gray-500 group-hover:text-blue-600" />
            <span className="hover:text-blue-600">Dashboard</span>
          </Link>
          <Link to={"/order"} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">
            <FaBoxOpen className="text-gray-500 group-hover:text-blue-600" />
            <span className="hover:text-blue-600">Orders</span>
          </Link>
          <li
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <FiLogOut className="text-red-500 group-hover:text-red-600" />
            <span className="text-red-500 hover:text-red-600">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
