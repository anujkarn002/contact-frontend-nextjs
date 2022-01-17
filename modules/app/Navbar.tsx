import Button from "components/Button";
import Input from "components/Input";
import useTokenStore from "modules/auth/useTokenStore";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiArrowLeft, FiMenu } from "react-icons/fi";
import useAppStore from "./useAppStore";

const Navbar = () => {
  const { isLoggedIn, logout, toggleSidebar } = useAppStore();
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row justify-between py-1 px-4">
        <div className="flex flex-row items-center">
          <div className="w-64 flex flex-row items-center">
            {router.pathname === "/" ? (
              <button
                onClick={toggleSidebar}
                className="w-10 h-10 text-gray-600 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none  hover:bg-gray-200 hover:text-gray-800"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => router.push("/")}
                className="w-10 h-10 text-gray-600 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none  hover:bg-gray-200 hover:text-gray-800"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
            )}
            <a href="/">
              <div className="flex flex-row px-2">
                {/* <img src="/frogact.png" alt="frogact" height={30} width={30} /> */}
                <h4 className="text-secondary">Frogact</h4>
              </div>
            </a>
          </div>
          <div className="relative w-96">
            <label
              className="absolute inset-y-0 left-0 pl-3 flex items-center z-10"
              htmlFor="searchP"
            >
              <AiOutlineSearch className="w-5 h-5 text-gray-400 hover:text-gray-500" />
            </label>
            {/* <input
              id="searchP"
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 hover:border-gray-400 pl-10 py-3 pr-4 text-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            /> */}
            <Input
              className="w-full pl-10 py-3 pr-4 rounded-md border-0 bg-gray-100"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {!isLoggedIn && (
          <Button
            size="larger"
            layout="link"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button size="larger" layout="link" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default Navbar;
