import React from 'react'
import { FaCheck } from "react-icons/fa";
import Cardd2 from '../Images/Cardd2.svg'
import wave from '../Images/wave.svg'
import micc from '../Images/micc.svg'

const Section4 = () => {
  return (
    <div>
        <div className='flex'>        
            <div>
                <div>
                    <h1>Never Miss an Action Item</h1>
                    <p>Memo automatically extracts commitments, deadlines, and to-dos from your conversations turning follow-ups into a ready-to-use task list before the meeting even ends.</p>
                </div>

                <div className="flex flex-row gap-6">
                    <div className='flex flex-col gap-6'>
                        <p className="flex items-center gap-4 text-3xl font-medium">
                            <span className="flex items-center justify-center w-12 h-12 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-xl" />
                            </span>
                            Your to-dos, already written.
                        </p>

                        <p className="flex items-center gap-4 text-3xl font-medium">
                            <span className="flex items-center justify-center w-12 h-12 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-xl" />
                            </span>
                            Turn talk into tasks
                        </p>
                    </div>

                    <div className='flex flex-col gap-6'>

                        <p className="flex items-center gap-4 text-3xl font-medium">
                            <span className="flex items-center justify-center w-12 h-12 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-xl" />
                            </span>
                            Action items, delivered instantly.
                        </p>

                        <p className="flex items-center gap-4 text-3xl font-medium">
                            <span className="flex items-center justify-center w-12 h-12 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-xl" />
                            </span>
                            Tasks extracted. 
                        </p>
                    </div>

                </div>

                <div className='bg-[#2828FA] w-40 h-12 flex items-center justify-center'>
                    <p>Dive deeper</p>
                </div>
            </div>

            <div className='relative'>
                <img className='relative' src={Cardd2} alt="img" />
                <div className='absolute top-25'>
                    <img className='relative' src={wave} alt="" />
                    <img className='absolute top-7' src={micc} alt="" />
                </div>
            </div>


        </div>
    </div>
  )
}

export default Section4