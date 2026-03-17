import React from 'react'
import { useLocation } from "react-router-dom";
import { FiSearch, FiUpload, FiBell } from "react-icons/fi";
import {  } from "react-icons/fi";


const Searchbar = () => {

    const location = useLocation();

    const routeNames = {
    "/dashboard": "Home",
    "/dashboard/library": "Library",
    "/dashboard/transcript": "Transcript",
    "/dashboard/todo": "To-Do List",
    "/dashboard/settings": "Settings",
    "/dashboard/transcript/summary": "Summary",
};

const currentPage = routeNames[location.pathname] || "Home";

    
  return (
    <div className='h-18 px-10 bg-white flex items-center justify-between border-b border-[#CCCCCC] '>
        <div className='flex items-center'>
            <div className='text-[16px] w-28.5 font-semibold text-[#111827]'>
                {currentPage}
            </div>
            
            <div className="w-105 max-w-full ">
                <div className="flex items-center bg-[#F9FAFB] border h-9 border-[#E5E7EB] gap-3 px-5 py-3 rounded-full">
                    <FiSearch className="text-[#374957] text-xl" />
                    <input
                    type="text"
                    placeholder="Search recordings, notes..."
                    className="bg-transparent text-[13px] w-full text-[#9CA3AF] placeholder-[#9CA3AF]"
                    />
                </div>
            </div>
        </div>

        <div className="flex gap-2">
      
            {/* Upload */}
            <button className="w-9 h-9 flex items-center justify-center border-2 border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-gray-100 transition">
                <FiUpload />
            </button>

            {/* Notification */}
            <button className="w-9 h-9 flex items-center justify-center border-2 border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-gray-100 transition">
                <FiBell />
            </button>

        </div>

    </div>
  )
}

export default Searchbar