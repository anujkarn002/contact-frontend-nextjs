import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAppStore from "./useAppStore";
import { IoExitOutline, IoSettingsSharp } from "react-icons/io5";
import { MdOutlineLabel } from "react-icons/md";
import { AiOutlineUser, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { BsChevronUp, BsPrinter } from "react-icons/bs";
import { BiExport, BiImport } from "react-icons/bi";
import {
  FiChevronUp,
  FiChevronDown,
  FiPrinter,
  FiTrash2,
  FiUploadCloud,
  FiDownloadCloud,
  FiUnlock,
  FiMenu,
  FiX,
  FiUser,
  FiUserPlus,
  FiTag,
  FiSettings,
  FiPhone,
  FiHeart,
  FiEdit2,
  FiPlus,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Label } from "modules/contact";
import withAuth from "modules/auth/withAuth";
import Button from "components/Button";
import { privateAgent } from "lib/request";
import useContactStore from "modules/contact/useContactStore";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, logout } = useAppStore();
  const { contacts, labels } = useContactStore();
  const { pathname, query, push } = useRouter();

  const [showLabels, setShowLabels] = useState(true);

  const toggleLabels = () => setShowLabels(!showLabels);

  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <div
      className={`transform  ease-in-out transition-all duration-300 z-30 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full overflow-y-auto flex-col bg-white w-72 px-4 pb-6 pt-4  min-h-full relative">
        <Button
          iconLeft={AiOutlinePlus}
          size="larger"
          layout="outline"
          style={{ borderRadius: "99999px" }}
          onClick={() => push("/contact/new")}
        >
          Create Contact
        </Button>
        <div className="flex flex-col mt-6  justify-between flex-1">
          <nav className="text">
            <Link href={"/"}>
              <a
                href={"/"}
                className={`capitalize flex items-center px-4 py-2 mt-5 ${
                  pathname === "/"
                    ? "bg-gray-200 text-gray-700"
                    : " text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform"
                } rounded-md`}
              >
                <FiUser className="w-5 h-5 text-gray-400 hover:text-gray-500" />

                <span className="mx-4 font-medium">Contacts</span>
              </a>
            </Link>

            <hr className="my-2" />
            <button
              onClick={toggleLabels}
              className="w-full capitalize flex items-center px-4 py-2  rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
            >
              {showLabels ? (
                <FiChevronUp className="w-5 h-5 text-gray-400 hover:text-gray-500" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-400 hover:text-gray-500" />
              )}
              <span className="mx-4 font-medium">Labels</span>
            </button>
            {showLabels &&
              labels.map((label) => (
                <Link href={`/label/${label.name.toLowerCase()}`}>
                  <a
                    href={`/label/${label.name.toLowerCase()}`}
                    className={`capitalize flex items-center px-4 py-2 mt-2 ${
                      query?.label?.includes(label.name.toLowerCase())
                        ? "bg-gray-200 text-gray-700"
                        : " text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform"
                    } rounded-md`}
                  >
                    <FiTag className="w-5 h-5" />
                    <span className="mx-4 font-medium">{label.name}</span>
                  </a>
                </Link>
              ))}
            {showLabels && (
              <button
                onClick={() => alert("Coming Soon")}
                className="w-full capitalize flex items-center px-4 py-2 mt-2 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
              >
                <FiPlus className="w-5 h-5 text-gray-400 hover:text-gray-500" />
                <span className="mx-4 font-medium">Create Label</span>
              </button>
            )}
          </nav>
          <Button
            iconLeft={IoExitOutline}
            size="larger"
            layout="outline"
            style={{ borderRadius: "99999px" }}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Sidebar);
