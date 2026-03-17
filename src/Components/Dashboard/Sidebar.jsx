import React from "react";
import { NavLink } from "react-router-dom";

import { FaHome, FaBook, FaList, FaCog } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import image from "../../Images/philip.svg";

const Sidebar = () => {
  return (
    <div className="bg-[#FFFFFF] w-[15vw] border-r border-[#CCCCCC] flex flex-col justify-between text-geist">

      <div>

        <div className="py-2 px-4 h-18 border-b border-[#CCCCCC]">
          <h1 className="font-bold text-[#2828FA] text-audiowide text-[25px]">
            MEMO AI
          </h1>
          <p className="text-[10px] text-[#000000]">
            Your meetings, summarized
          </p>
        </div>

        <nav className="space-y-3 px-4 mt-3 text-[12px] font-semibold">

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `px-3 py-2.5 flex items-center gap-3 rounded-lg cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-[#2B2B2B] hover:text-black"
              }`
            }
          >
            <FaHome size={24} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="library"
            className={({ isActive }) =>
              `px-3 py-2.5 flex items-center gap-3 rounded-lg cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-[#2B2B2B] hover:text-black"
              }`
            }
          >
            <FaBook size={24} />
            <span>Library</span>
          </NavLink>

          <NavLink
            to="/dashboard/transcript"
            className={({ isActive }) =>
              `px-3 py-2.5 flex items-center gap-3 rounded-lg cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-[#2B2B2B] hover:text-black"
              }`
            }
          >
            <FaList size={24} />
            <span>Transcript</span>
          </NavLink>

          <NavLink
            to="todo"
            className={({ isActive }) =>
              `px-3 py-2.5 flex items-center gap-3 rounded-lg cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-[#2B2B2B] hover:text-black"
              }`
            }
          >
            <HiOutlineClipboardList size={24} />
            <span>To-Do List</span>
          </NavLink>

          <NavLink
            to="settings"
            className={({ isActive }) =>
              `px-3 py-2.5 flex items-center gap-3 rounded-lg cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-[#2B2B2B] hover:text-black"
              }`
            }
          >
            <FaCog size={24} />
            <span>Settings</span>
          </NavLink>

        </nav>

      </div>

      <div className="p-4 border-t border-[#CCCCCC] flex items-center gap-3">
        <img src={image} className="h-9 w-9" />
        <span className="text-[16px] font-semibold">Philip Joy</span>
      </div>

    </div>
  );
};

export default Sidebar;