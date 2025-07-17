import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { IoClose } from "react-icons/io5";
import { UserContext } from "./../context/UserContext";
import { ProductContext } from "../context/ProductContext";
ProductContext;
function Navbar() {
  const { singleUser } = useContext(UserContext);
  const { setSearch, search } = useContext(ProductContext);
  const [open, setOpen] = useState(false);

  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to={"/"}>
        <img
          className="h-9"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
          alt="dummyLogoColored"
        />
      </Link>
      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/all-products"}>All Products</Link>
        <a href="#">About</a>
        <a href="#">Contact</a>
        {location.pathname === "/all-products" && (
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
              value={search}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                clip-rule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}

        <div className="relative cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#615fff"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>

        {singleUser._id ? (
          <Link to={"/dashboard"}>
            <button className="cursor-pointer px-5 py-1 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Dashboard
            </button>
          </Link>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="cursor-pointer px-5 py-1 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="cursor-pointer px-5 py-1 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                SignUp
              </button>
            </Link>
          </>
        )}

        <div className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-500 hover:bg-gray-600 transition rounded-full">
          <ProfileMenu />
        </div>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        {open ? (
          <IoClose className=" text-2xl font-bold" />
        ) : (
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/"} className="block">
          Home
        </Link>
        <Link to={"/about"} className="block">
          About
        </Link>
        <Link to={"/contact"} className="block">
          Contact
        </Link>
        <Link to={"/login"}>
          <button className="cursor-pointer px-5 py-1 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
            Login
          </button>
        </Link>
        <Link to={"/register"}>
          <button className="cursor-pointer px-5 py-1 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
            SignUp
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
