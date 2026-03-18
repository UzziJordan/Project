import React from 'react'
import { useState } from "react";

import profileimg from '../../Images/profileimg.svg'
import Searchbar from '../../Components/Dashboard/Searchbar';


const Settings = () => {
  
  const [enabled, setEnabled] = useState(false);
  const percentage = 25;

  return (
    <div className=' text-geist  pt-20 '>
      <Searchbar />

      <div className='mx-18 flex flex-col mt-7 gap-7'>
        <h1 className="text-[20px] font-medium">Settings</h1>

        {/* PROFILE */}
        <div className="bg-white rounded-xl text-[18px] font-medium">
          <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">Profile</div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <div>
              <p className="font-medium">Profile Photo</p>
              <p className="text-[#9CA3AF] ">Update you profile picture</p>
            </div>

            <div className="flex items-center gap-5">
              <img
                src={profileimg}
                className=" "
              />
              <button className="bg-[#F3F4F6] p-2 rounded-lg">
                Change
              </button>
            </div>
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <p>Full Name</p>
            
            <input
              type="text"
              value="Philip Joy"
              className="bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-2xl "
            />
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <p>Email Address</p>
            
            <input
              type="text"
              value="mailhub@gmail.com"
              className="bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-2xl "
            />
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <p>Country</p>
            <select className="bg-[#F9FAFB] border border-[#E5E7EB]  px-4 py-2 rounded-2xl ">
              <option>Nigeria </option>
            </select>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white rounded-xl text-[18px] font-medium">
          <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">Notifications</div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <div>
              <p className="font-medium">Daily Review Reminder</p>
              <p className="text-sm text-gray-500">
                Get daily review of recordings daily
              </p>
            </div>

            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition
                ${enabled ? "bg-indigo-500" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
                  ${enabled ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
            
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <div>
              <p className="font-medium">Weekly Digest</p>
              <p className="text-sm text-gray-500">
                Get weekly digest of recordings weekly
              </p>
            </div>

            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition
                ${enabled ? "bg-indigo-500" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
                  ${enabled ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <div>
              <p className="font-medium">Missed To-dos Alert</p>
              <p className="text-sm text-gray-500">
                Remind me 24h before task deadlines
              </p>
            </div>

            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition
                ${enabled ? "bg-indigo-500" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
                  ${enabled ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>

        {/* EXPORT OPTIONS */}
        <div className="bg-white rounded-xl text-[18px] font-medium">
          <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">Export Options</div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <p>Default Export Format</p>
            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>PDF with summary</option>
            </select>
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <p>Include Speaker Labels</p>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition
                ${enabled ? "bg-indigo-500" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
                  ${enabled ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <p>Include Timestamps</p>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition
                ${enabled ? "bg-indigo-500" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
                  ${enabled ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>

        {/* SUPPORT */}
        <div className="bg-white rounded-xl text-[18px] font-medium">
          <div className="px-6 py-4 font-semibold border-b border-[#F3F4F6]">Support</div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <p className="font-medium">Help Center</p>
            <p className="text-sm text-gray-500">Help</p>
          </div>

          <div className="px-6 py-4 flex justify-between font-semibold border-b border-[#F3F4F6]">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Storage Used</p>
                <p className="text-sm text-gray-500">12.4 GB of 50GB</p>
              </div>

              <span className="text-sm text-gray-500">25%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="w-1/4 h-2 bg-indigo-500 rounded-full"></div>
            </div>
          
          </div>

          <div className="px-6 py-4 flex justify-between items-center font-semibold border-b border-[#F3F4F6]">
            <div>
              <p className="text-red-500 font-medium">Delete Account</p>
              <p className="text-sm text-gray-500">
                Permanently remove all data
              </p>
            </div>

            <button className="bg-red-100 text-red-500 px-4 py-1 rounded-lg">
              Delete
            </button>
          </div>
        </div>

      </div>
      
    </div>
  );
} 

export default Settings