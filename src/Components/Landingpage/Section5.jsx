import React from 'react';
import { FaCheck } from "react-icons/fa";
import Card3 from '../../Images/Card3.svg';

/**
 * Section5 Component
 * Purpose: Highlights the searchable transcripts feature, allowing users to find specific moments in recordings.
 */
const Section5 = () => {
    // --- RENDER ---
    return (
        <div className='bg-[#EFF2F9] mt-18 w-full text-geist h-225 lg:h-125 '>
            {/* MAIN CONTAINER */}
            <div className='flex flex-col-reverse justify-center items-center align-middle py-12 gap-10 lg:gap-20 md:pt-5 lg:pt-10 lg:flex-row'>
                {/* IMAGE SECTION */}
                <div className='w-150 h-100 md:mt-2'>
                    <img src={Card3} alt="img" />
                </div>
                
                {/* CONTENT SECTION */}
                <div className='w-95 h-100 text-center lg:mx-0 lg:pt-3 lg:text-left '>
                    {/* HEADING AND DESCRIPTION */}
                    <div className='lg:pt-4'>
                        <h1 className='font-bold text-[32px] w-46.5 mx-2 lg:mx-0 flex'>Searchable <span className='bg-[#2828FA] text-white px-2'>Transcripts</span></h1>
                        <p className='text-[15px] text-[#6B7280]'>Every word is transcribed and indexed. Search across all your recordings by keyword, date, or speaker and jump straight to the exact moment that matters.</p>
                    </div>
                    
                    {/* CHECKPOINTS */}
                    <div className="flex flex-col gap-3 mt-4 items-start ml-10 lg:ml-0">
                        <p className="flex gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-6 h-6 border-[3px] border-gray-800 rounded-lg">
                                <FaCheck className="text-gray-800 text-l" />
                            </span>
                            AI-Powered Summaries in Seconds
                        </p>
                        <p className="flex gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-6 h-6 border-[3px] border-gray-800 rounded-lg">
                                <FaCheck className="text-gray-800 text-l" />
                            </span>
                            Action Items Extracted Automatically
                        </p>
                        <p className="flex gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-6 h-6 border-[3px] border-gray-800 rounded-lg">
                                <FaCheck className="text-gray-800 text-l" />
                            </span>
                            Searchable Transcripts by Keyword, Date, Speaker
                        </p>
                        <p className="flex gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-6 h-6 border-[3px] border-gray-800 rounded-lg">
                                <FaCheck className="text-gray-800 text-l" />
                            </span>
                            Speaker-Labeled Notes for Clarity
                        </p>
                    </div>
                    
                    {/* CTA BUTTON */}
                    <div className='bg-[#2828FA] text-[#FFFFFF] text-center w-40 h-12 flex items-center justify-center rounded-4xl mt-14 mx-auto md:mt-8 lg:mx-0'>
                        <p>Explore Memo AI</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section5;
