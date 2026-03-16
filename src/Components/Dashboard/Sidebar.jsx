import React from 'react'

import { FaHome, FaBook, FaList, FaCog } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import image from '../../Images/philip.svg'

const Sidebar = () => {
  return (
    <div className="w-60 bg-[#FFFFFF] border-r border-[#CCCCCC] flex flex-col justify-between text-geist">

        <div className=''>

            <div className="py-2 px-4 h-18 border-b border-[#CCCCCC]">
                <h1 className='font-bold text-[#2828FA] text-audiowide text-[25px]'>MEMO AI</h1>
                <p className="text-[12px] text-[#000000]">Your meetings, summarized</p>
            </div>

            <nav className="space-y-3 px-4 mt-3 text-[16px] font-semibold">

                {/* ACTIVE ITEM */}
                <div className="px-3 py-2.5 flex items-center gap-4 text-[#2B2B2B] hover:text-black cursor-pointer">
                    <FaHome size={24} />
                    <span>Home</span>
                </div>

                {/* MENU ITEMS */}
                <div className="px-3 py-2.5 flex items-center gap-4 text-[#2B2B2B] hover:text-black cursor-pointer">
                    <FaBook size={24} />
                    <span>Library</span>
                </div>

                <div className="px-3 py-2.5 flex items-center gap-4 text-[#2B2B2B] hover:text-black cursor-pointer">
                    <FaList size={24} />
                    <span className="text-lg font-semibold">Transcript</span>
                </div>

                <div className="px-3 py-2.5 flex items-center gap-4 text-[#2B2B2B] hover:text-black cursor-pointer">
                    <HiOutlineClipboardList size={24} />
                    <span className="text-lg font-semibold">To-Do List</span>
                </div>

                <div className="px-3 py-2.5 flex items-center gap-4 text-[#2B2B2B] hover:text-black cursor-pointer">
                    <FaCog size={24} />
                    <span className="text-lg font-semibold">Settings</span>
                </div>

            </nav>

        </div>

        <div className="p-4 border-t border-[#CCCCCC] flex items-center gap-3">

            <img
            src={image}
            className="h-9 w-9  "
            />

            <span className="text-[16px] font-semibold">Philip Joy</span>

        </div>

    </div>
  );
}
export default Sidebar