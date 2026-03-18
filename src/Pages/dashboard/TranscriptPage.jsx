import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import Searchbar from '../../Components/Dashboard/Searchbar';

/**
 * TranscriptPage Component
 * Purpose: Provides a tabbed interface for viewing transcripts, summaries, and action items of a recording.
 */
const TranscriptPage = () => {
    // --- RENDER ---
    return (
        <div className='pt-18 md:pt-20 text-geist'>
            <Searchbar />

            {/* TAB NAVIGATION SECTION */}
            <div className="flex flex-wrap mx-4 md:mx-10 lg:mx-18 mt-6 md:mt-8 gap-2 md:gap-3 mb-4 md:mb-6">
                {/* Transcript Tab Link */}
                <NavLink
                    to="/dashboard/transcript"
                    end
                    className={({ isActive }) =>
                        `px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition ${
                            isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border text-gray-500 hover:bg-gray-50"
                        }`
                    }
                >
                    Transcript
                </NavLink>

                {/* Summary Tab Link */}
                <NavLink
                    to="/dashboard/transcript/summary"
                    className={({ isActive }) =>
                        `px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition ${
                            isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border text-gray-500 hover:bg-gray-50"
                        }`
                    }
                >
                    Summary
                </NavLink>

                {/* To-Do Tab Link */}
                <NavLink
                    to="/dashboard/transcript/todo"
                    className={({ isActive }) =>
                        `px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition ${
                            isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-white border text-gray-500 hover:bg-gray-50"
                        }`
                    }
                >
                    To-Do
                </NavLink>
            </div>

            {/* NESTED CONTENT SECTION */}
            <div className="mx-4 md:mx-10 lg:mx-18">
                <Outlet />
            </div>
        </div>
    );
};

export default TranscriptPage;
