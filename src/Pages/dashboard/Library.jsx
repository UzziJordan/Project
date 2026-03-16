import React from 'react'
import { FiSearch, FiSliders } from "react-icons/fi";

import Searchbar from '../../Components/Dashboard/Searchbar'
import RecordHistory from '../../Components/Dashboard/RecordHistory';

const Library = () => {
  return (

    <div className=' text-geist '>
        <Searchbar />

        <div className='text-black flex justify-between font-bold text-[20px] px-18 py-5'>
            <p>Recordings Library</p>
            
            <div className='bg-[#2828FA] text-white items-center text-[14px] font-semibold gap-2 flex py-3 px-5 rounded-full'>
                <p className='h-3 w-3 flex rounded-full bg-white text- '> </p>
                <p >New Recording</p>
            </div>
        </div>

        <div className="w-full px-18">
            <div className="flex items-center justify-between bg-gray-100 border border-indigo-300 rounded-full px-4 py-3">
                
                {/* Left side */}
                <div className="flex items-center gap-3 w-full">
                    <FiSearch className="text-gray-500 text-lg" />

                    <input
                        type="text"
                        placeholder="Search by keyword across transcripts and summaries."
                        className="bg-transparent outline-none w-full text-indigo-500 placeholder-indigo-400"
                    />
                </div>

                {/* Right icon */}
                <FiSliders className="text-gray-500 text-lg cursor-pointer" />

            </div>
        </div>

        <div className='flex text-[#4B5563] mt-2 justify-end px-18 '>
            View All →
        </div>

        <RecordHistory />


    </div>
  )
}

export default Library