import React from 'react'
import { FaCheck } from "react-icons/fa";
import Card1 from '../Images/Card1.svg'



const Section3 = () => {
  return (
    <div className='bg-[#EFF2F9]'>
        <div className='flex'>
            <div>
             <img src={Card1} alt="img" />
            </div>
        
            <div>
                <div className='h-10.5 w-25 bg-[#2828FA]/10'>
                    <p>WHY MEMO</p>
                </div>

                <div>
                    <h1>Save Hours Every Week</h1>
                    <p>Stop relistening to hour-long recordings. Memo's AI delivers a concise 3 – 5 bullet  summary in seconds, so you get the full picture without replaying a single second.</p>
                </div>

                <div className="flex flex-col gap-6">

                    <p className="flex items-center gap-4 text-3xl font-medium">
                        <span className="flex items-center justify-center w-12 h-12 bg-green-800 rounded-full">
                        <FaCheck className="text-white text-xl" />
                        </span>
                        Skip the playback. Keep the value.
                    </p>

                    <p className="flex items-center gap-4 text-3xl font-medium">
                        <span className="flex items-center justify-center w-12 h-12 bg-green-800 rounded-full">
                        <FaCheck className="text-white text-xl" />
                        </span>
                        Your time, reclaimed.
                    </p>

                </div>

                <div className='bg-[#2828FA] w-40 h-12 flex items-center justify-center'>
                    <p>Discover More</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Section3