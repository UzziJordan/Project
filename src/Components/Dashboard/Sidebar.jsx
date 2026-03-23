import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FaHome, FaBook, FaList, FaCog } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";

import image from "../../Images/philip.svg";
import { account } from "../../lib/appwrite";


// ================= CONFIG =================
const navItems = [
  { name: "Home", path: "/dashboard", icon: FaHome, end: true },
  { name: "Library", path: "library", icon: FaBook },
  { name: "Transcript", path: "/dashboard/transcript", icon: FaList },
  { name: "To-Do List", path: "todo", icon: HiOutlineClipboardList },
  { name: "Settings", path: "settings", icon: FaCog },
];


// ================= COMPONENT =================
const Sidebar = ({ isOpen, setIsOpen }) => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();


  // ================= EFFECTS =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser(await account.get());
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // ================= HANDLERS =================
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      localStorage.removeItem("user");
      localStorage.removeItem("latestRecording");
      localStorage.removeItem("recordings"); // Cleanup legacy data
      localStorage.removeItem("generalTodos"); // Cleanup legacy data
      navigate("/Onboarding");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  // ================= UI =================
  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#CCCCCC] flex flex-col justify-between transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:w-[15vw]
      `}>

        {/* ===== TOP ===== */}
        <div>
          {/* BRAND */}
          <div className="px-4 py-2 h-18 border-b border-[#CCCCCC] flex items-center justify-between">
            <div>
              <h1 className="text-[25px] font-bold text-[#2828FA] text-audiowide">
                MEMO AI
              </h1>
              <p className="text-[10px]">Your meetings, summarized</p>
            </div>
            
            {/* CLOSE BUTTON (MOBILE ONLY) */}
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* NAV */}
          <nav className="mt-3 px-4 space-y-2 text-[12px] font-semibold">
            {navItems.map(({ name, path, icon: Icon, end }) => (
              <NavLink
                key={name}
                to={path}
                end={end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-[#2B2B2B] hover:text-black"
                  }`
                }
              >
                <Icon size={22} />
                {name}
              </NavLink>
            ))}
          </nav>
        
        </div>


        {/* ===== BOTTOM (USER) ===== */}
        <div
          ref={menuRef}
          onClick={() => setShowMenu((p) => !p)}
          className="relative flex items-center gap-3 p-4 border-t border-[#CCCCCC] cursor-pointer"
        >
          <img
            src={image}
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover"
          />

          <span className="text-[16px] font-semibold">
            {user?.name || "Guest"}
          </span>

          {showMenu && (
            <div className="absolute bottom-16 left-4 w-40 bg-white border rounded-lg shadow-md">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

      </aside>
    </>
  );
};

export default Sidebar;