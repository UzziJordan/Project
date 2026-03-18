import React, { useEffect, useState } from 'react';
import profileimg from '../../Images/profileimg.svg';
import Searchbar from '../../Components/Dashboard/Searchbar';
import { account } from "../../lib/appwrite";

/**
 * Settings Component
 * Purpose: Allows users to manage their profile, notification preferences, and export options.
 */
const Settings = () => {

    // --- STATE AND HOOKS ---
    const [enabled, setEnabled] = useState(false);
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);


    // --- SIDE EFFECTS ---
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
            } catch (error) {
                console.error("Failed to fetch user in Settings:", error);
                setUser(null);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, []);


    // --- CONSTANTS ---
    const userName = user ? user.name : "Guest";
    const userEmail = user ? user.email : "N/A";


    // --- RENDER HELPERS ---
    if (loadingUser) {
        return (
            <div className='text-geist pt-20 flex justify-center items-center h-screen'>
                <p className="text-gray-500">Loading user data...</p>
            </div>
        );
    }


    // --- MAIN RENDER ---
    return (
        <div className='text-geist pt-20'>

            <Searchbar />

            <div className='mx-18 flex flex-col mt-7 gap-7 pb-20'>

                <h1 className="text-[20px] font-medium">
                    Settings
                </h1>


                {/* --- PROFILE SECTION --- */}
                <div className="bg-white rounded-xl text-[18px] font-medium shadow-sm">

                    <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">
                        Profile
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <div>
                            <p className="font-medium">Profile Photo</p>
                            <p className="text-[#9CA3AF] text-sm">
                                Update your profile picture
                            </p>
                        </div>

                        <div className="flex items-center gap-5">
                            <img
                                src={profileimg}
                                className="h-12 w-12 rounded-full object-cover"
                                alt="Profile"
                            />

                            <button className="bg-[#F3F4F6] p-2 rounded-lg text-sm hover:bg-gray-100 transition">
                                Change
                            </button>
                        </div>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <p className="text-gray-700">
                            Full Name
                        </p>

                        <input
                            type="text"
                            value={userName}
                            readOnly
                            className="bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-lg text-base text-gray-800"
                        />
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <p className="text-gray-700">
                            Email Address
                        </p>

                        <input
                            type="text"
                            value={userEmail}
                            readOnly
                            className="bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-lg text-base text-gray-800"
                        />
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold">
                        <p className="text-gray-700">
                            Country
                        </p>

                        <select className="bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-lg text-base text-gray-800">
                            <option>Nigeria</option>
                            <option>United States</option>
                            <option>Canada</option>
                        </select>
                    </div>
                </div>


                {/* --- NOTIFICATIONS SECTION --- */}
                <div className="bg-white rounded-xl text-[18px] font-medium shadow-sm">

                    <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">
                        Notifications
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <div>
                            <p className="font-medium text-gray-700">
                                Daily Review Reminder
                            </p>

                            <p className="text-sm text-gray-500">
                                Get a daily review of recordings
                            </p>
                        </div>

                        <button
                            onClick={() => setEnabled(!enabled)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300
                                ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300
                                    ${enabled ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <div>
                            <p className="font-medium text-gray-700">
                                Weekly Digest
                            </p>

                            <p className="text-sm text-gray-500">
                                Get a weekly digest of recordings
                            </p>
                        </div>

                        <button
                            onClick={() => setEnabled(!enabled)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300
                                ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300
                                    ${enabled ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold">
                        <div>
                            <p className="font-medium text-gray-700">
                                Missed To-dos Alert
                            </p>

                            <p className="text-sm text-gray-500">
                                Remind me 24h before task deadlines
                            </p>
                        </div>

                        <button
                            onClick={() => setEnabled(!enabled)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300
                                ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300
                                    ${enabled ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                    </div>
                </div>


                {/* --- EXPORT OPTIONS SECTION --- */}
                <div className="bg-white rounded-xl text-[18px] font-medium shadow-sm">

                    <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">
                        Export Options
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <p className="text-gray-700">
                            Default Export Format
                        </p>

                        <select className="border border-[#E5E7EB] rounded-lg px-3 py-1 text-sm text-gray-800">
                            <option>PDF with summary</option>
                            <option>Plain Text</option>
                            <option>Markdown</option>
                        </select>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <p className="text-gray-700">
                            Include Speaker Labels
                        </p>

                        <button
                            onClick={() => setEnabled(!enabled)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300
                                ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300
                                    ${enabled ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold">
                        <p className="text-gray-700">
                            Include Timestamps
                        </p>

                        <button
                            onClick={() => setEnabled(!enabled)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300
                                ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300
                                    ${enabled ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                    </div>
                </div>


                {/* --- SUPPORT SECTION --- */}
                <div className="bg-white rounded-xl text-[18px] font-medium shadow-sm">

                    <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">
                        Support
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
                        <p className="font-medium text-gray-700">
                            Help Center
                        </p>

                        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                            View Help
                        </p>
                    </div>

                    <div className="px-6 py-4 flex justify-between font-semibold border-b border-[#F3F4F6]">
                        <div className="flex-1">
                            <p className="font-medium text-gray-700">
                                Storage Used
                            </p>

                            <p className="text-sm text-gray-500">
                                12.4 GB of 50GB
                            </p>
                        </div>

                        <div className="w-1/2 h-2 bg-gray-200 rounded-full flex items-center">
                            <div className="w-1/4 h-2 bg-indigo-500 rounded-full"></div>
                            <span className="text-sm text-gray-500 ml-2">
                                25%
                            </span>
                        </div>
                    </div>

                    <div className="px-6 py-4 flex justify-between items-center font-semibold">
                        <div>
                            <p className="text-red-500 font-medium">
                                Delete Account
                            </p>

                            <p className="text-sm text-gray-500">
                                Permanently remove all data
                            </p>
                        </div>

                        <button className="bg-red-100 text-red-500 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm">
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;