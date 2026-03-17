import React from 'react'
import { FiSearch, FiEdit, FiShare2, FiCalendar, FiClock } from "react-icons/fi";

import wavve from '../../Images/wavve.svg'
import playi from '../../Images/playi.svg'
import spk1 from '../../Images/spk1.svg'
import spk2 from '../../Images/spk2.svg'
import spk3 from '../../Images/spk3.svg'


const TranscriptTab = () => {
  return (
    <div className="mx-18  gap-6">

        <div className="w-full p-3 rounded-2xl border border-[#EBEBEB] flex items-center justify-between">
      
            {/* Left side */}
            <div>
                <h1 className="text-lg font-semibold text-gray-800">
                    Digital Marketing Meeting
                </h1>

                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                        <FiCalendar className="text-base" />
                        <span>Tue, 23 Aug, 19:26:54</span>
                    </div>
                    <span>•</span>

                    <div className="flex items-center gap-1">
                        <FiClock className="text-base" />
                        <span>35 min</span>
                    </div>

                    <span>•</span>
                    <span>3 Speakers</span>
                </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
                
                {/* Edit */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <FiEdit />
                    Edit
                </button>

                {/* Share */}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <FiShare2 />
                    Share
                </button>

            </div>
        </div>


        <div className='mt-2 flex gap-4'>
            {/* LEFT PANEL */}
            <div className="bg-white rounded-xl  p-4 space">

                <div>
                    <p className="font-semibold">Digital Marketing Meeting</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span>Aug 23</span>
                        
                        <span>2:30 PM </span>
                        
                        <span>•</span>

                        <div className="flex items-center gap-1">
                            <FiClock className="text-base" />
                            <span>35 min</span>
                        </div>

                    </div>
                </div>

                {/* Fake waveform */}
                <div className='my-2'> 
                    <img src={wavve} alt="" />
                </div>

                {/* Player */}
                <div className='flex flex-col p-3 gap-2 rounded-2xl border-b-2 border-[#AAAAAA]'>

                    <div className='flex justify-between items-center'>
                        <img src={playi} alt="" />

                        <div className='flex flex-col'>
                            <p className="text-sm mb-1">Digital Marketing Meeting</p>
                            <p className="text-xs text-gray-500 mt-1">14:22 / 35:00</p>

                        </div>

                        <div> 1x </div>
                    </div>

                    
                    <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="w-1/3 h-2 bg-indigo-500 rounded"></div>
                    </div>

                </div>

                {/* Speakers */}
                <div>
                    <p className="flex font-medium mt-15 mb-2">Speakers</p>
                    <div className='flex justify-between'>

                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-3'>
                                <img src={spk1} alt="" />
                                <span>Harriet Davis</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <img src={spk2} alt="" />
                                <span>Uzzi John</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <img src={spk3} alt="" />
                                <span>John Doe</span>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                                Host
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white rounded-xl  p-4 space">

                {/* Top bar */}
                <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold">Transcript</div>

                    <div className="flex items-end justify-between">
                        <div className="flex items-center px-3 py-1 rounded-lg">
                            <FiSearch className="text-gray-500 mr-2" />
                            <input
                                placeholder="Search"
                                className="items-center text-center bg-transparent w-25"
                            />
                        </div>

                        <button className="px-3 py-1 text-center items-center bg-gray-100 rounded-lg text-sm">
                            Copy all
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="space-y-6 text-sm">

                    <div>
                        <p className="font-medium">Harriet Davis</p>
                        <p className="text-gray-600">
                            Good afternoon everyone, thanks for joining.
                            Let’s quickly go over the digital marketing roadmap for Q2.
                        </p>
                    </div>

                    <div>
                        <p className="font-medium">Uzzi John</p>
                       
                        <p className="text-gray-600">
                            Afternoon Harriet, I’m ready. We finalized the priorities last week right?
                        </p>
                    </div>

                    <div>
                        <p className="font-medium">Harriet Davis</p>
                        
                        <p className="text-gray-600">
                            Sounds good. Action items: Sarah – finish content migration by April 15.
                        </p>
                    </div>

                    {/* Highlight */}
                    <div>
                        <p className="font-medium">Harriet Davis</p>
                        
                        <p className="bg-green-100 inline-block px-1">
                            Perfect. Next: social media campaign.
                        </p>
                    </div>

                </div>

            </div>
        </div>


    </div>
  )
}

export default TranscriptTab