import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/Sidebar";

/**
 * DashboardLayout Component
 * Purpose: Provides a consistent layout for all dashboard pages, including a sidebar and content area.
 */
const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- RENDER ---
    return (
        <div className="flex h-screen text-geist">
            {/* NAVIGATION SIDEBAR */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* MAIN CONTENT AREA */}
            <div className="bg-[#EFF2F9] h-screen flex-1 overflow-x-hidden w-full md:w-[85vw]">
                <Outlet context={[isSidebarOpen, setIsSidebarOpen]} />
            </div>
        </div>
    );
};

export default DashboardLayout;