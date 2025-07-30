import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdAddBox, MdViewList, MdListAlt } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaClipboardList, FaListUl } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { UserContext } from "../context/UserContext";
import { FaArrowAltCircleRight } from "react-icons/fa";

UserContext;
function Dashboard() {
  const { singleUser } = useContext(UserContext);
  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    // {
    //   name: "Overview",
    //   path: "/dashboard/overview",
    //   icon: <AiOutlineBarChart />,
    // },
    {
      name: "Product List",
      path: "/dashboard/productlist",
      icon: <MdViewList />,
    },
    {
      name: "Add Products ",
      path: "/dashboard/addproduct",
      icon: <MdAddBox />,
    },
    {
      name: "Orders List ",
      path: "/dashboard/orders",
      icon: <FaClipboardList />,
    },
  ];

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
          <Link to={"/"}>
            <img
              className="h-9"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
              alt="dummyLogoColored"
            />
          </Link>
          <div className="flex items-center gap-5 text-gray-500">
            <p>Hi! {singleUser.name}</p>
            <Link to={"/profile"}>
              {" "}
              <div className=" flex items-center border rounded-full gap-2 cursor-pointer text-sm px-4 py-1">
                <button>Profile </button>
                <span>
                  <FaArrowAltCircleRight />
                </span>
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="md:w-64 w-16 border-r border-gray-300 pt-4 bg-white">
            {sidebarLinks.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center py-3 px-4 gap-3 ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <h1 className=" text-2xl">{item.icon}</h1>
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            ))}
          </aside>

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
