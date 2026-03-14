import React from 'react'
import { FaCheck } from "react-icons/fa";
import Cardd2 from '../../Images/cardd2.svg'
import wave from '../../Images/wave.svg'
import micc from '../../Images/micc.svg'

const Section4 = () => {
  return (
    <div className=' mt-18 w-full text-geist h-225 lg:h-125 '>
        <div className='flex flex-col justify-center items-center align-middle py-12 gap-10 lg:gap-20 md:pt-5 lg:pt-10  lg:flex-row'>
            <div className='w-102 h-100 text-center mx-auto lg:mx-0 lg:pt-3 lg:text-left '>
                <div className='lg:pt-4'>
                    <h1 className='font-bold text-[32px] w-70 mx-auto lg:mx-0'>Never Miss an Action Item</h1>
                    <p className='text-[15px] text-[#6B7280]'>Memo automatically extracts commitments, deadlines, and to-dos from your conversations turning follow-ups into a ready-to-use task list before the meeting even ends.</p>
                </div>

                <div className='flex text-left gap-4 w-105'>
                    
                    <div className="flex flex-col gap-4 mt-4">
                        <p className="flex gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-5 h-5 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-l" />
                            </span>
                            Your to-dos, already written.
                        </p>

                        <p className="flex items-center gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-5 h-5 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-l" />
                            </span>
                            Turn talk into tasks
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">

                        <p className="flex items-center gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-5 h-5 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-l" />
                            </span>
                            Action items, delivered instantly.
                        </p>

                        <p className="flex items-center gap-4 text-[12px] font-medium">
                            <span className="flex items-center justify-center w-5 h-5 bg-green-800 rounded-full">
                            <FaCheck className="text-white text-l" />
                            </span>
                            Tasks extracted. 
                        </p>
                    </div>

                </div>

                <div className='bg-[#2828FA] text-[#FFFFFF] text-center w-40 h-12 flex items-center justify-center rounded-4xl mt-14 mx-auto md:mt-8 lg:mx-0'>
                    <p>Dive deeper</p>
                </div>
            </div>

            <div className='relative w-150 h-100'>
                <img className='relative' src={Cardd2} alt="img" />
                <div className='absolute top-37'>
                    <img className='relative' src={wave} alt="" />
                    <img className='absolute bottom-0' src={micc} alt="" />
                </div>
            </div>


        </div>
    </div>
  )
}

export default Section4