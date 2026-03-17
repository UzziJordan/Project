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
                    `px-4 py-2 rounded-lg ${
                    isActive ? "bg-gray-200" : "bg-gray-100"
                    }`
                }
                >
                Transcript
            </NavLink>

            <NavLink
                to="/dashboard/transcript/summary"
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg ${
                    isActive ? "bg-gray-200" : "bg-gray-100"
                    }`
                }
                >
                Summary
            </NavLink>
        </div>

        {/* Page Content */}
        <Outlet />

    </div>
  )
}

export default TranscriptPage