import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import Searchbar from '../../Components/Dashboard/Searchbar';

const TranscriptPage = () => {
  return (
    <div >
        <Searchbar />



        {/* Tabs */}
        <div className="flex mx-18 mt-8 gap-3 mb-6">

            <NavLink
                to="/dashboard/transcript"
                end
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition ${
                    isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border text-gray-500 hover:bg-gray-50"
                    }`
                }
                >
                Transcript
            </NavLink>

            <NavLink
                to="/dashboard/transcript/summary"
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition ${
                    isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border text-gray-500 hover:bg-gray-50"
                    }`
                }
                >
                Summary
            </NavLink>

            <NavLink
                to="/dashboard/transcript/todo"
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition ${
                    isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border text-gray-500 hover:bg-gray-50"
                    }`
                }
                >
                To-Do
            </NavLink>
        </div>

        {/* Page Content */}
        <Outlet />

    </div>
  )
}

export default TranscriptPage