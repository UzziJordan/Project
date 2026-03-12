import React from 'react'
import { FaCheck } from "react-icons/fa";
import Card3 from '../Images/Card3.svg'



const Section5 = () => {
  return (
    <div className='bg-[#EFF2F9]'>
        <div className='flex'>
            <div>
             <img src={Card3} alt="img" />
            </div>
        
            <div>
                <div>
                    <h1>Searchable <span>Transcripts</span></h1>
                    <p>Every word is transcribed and indexed. Search across all your recordings by keyword, date, or speaker and jump straight to the exact moment that matters.</p>
                </div>

                <div className="flex flex-col gap-6">

                    <p className="flex items-center gap-4 text-3xl font-medium">
                        <span className="flex items-center justify-center w-12 h-12 border-[3px] border-gray-800 rounded-lg">
                            <FaCheck className="text-gray-800 text-xl" />
                        </span>
                        AI-Powered Summaries in Seconds
                    </p>

                    <p className="flex items-center gap-4 text-3xl font-medium">
                        <span className="flex items-center justify-center w-12 h-12 border-[3px] border-gray-800 rounded-lg">
                            <FaCheck className="text-gray-800 text-xl" />
                        </span>
                        Action Items Extracted Automatically
                    </p>
                    <p className="flex items-center gap-4 text-3xl font-medium">
                        <span className="flex items-center justify-center w-12 h-12 border-[3px] border-gray-800 rounded-lg">
                            <FaCheck className="text-gray-800 text-xl" />
                        </span>
                        Searchable Transcripts by Keyword, Date, Speaker
                    </p>

                    <p className="flex items-center gap-4 text-3xl font-medium">
                        <span className="flex items-center justify-center w-12 h-12 border-[3px] border-gray-800 rounded-lg">
                            <FaCheck className="text-gray-800 text-xl" />
                        </span>
                        Speaker-Labeled Notes for Clarity
                    </p>



                </div>

                <div className='bg-[#2828FA] w-40 h-12 flex items-center justify-center'>
                    <p>Explore Memo AI</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Section5