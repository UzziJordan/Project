import React from 'react'
import { FaCheck } from "react-icons/fa";
import { FiUser, FiRadio } from "react-icons/fi";

import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <div className="max-h-screen   lg:h-256 flex flex-col lg:flex-row text-geist">
        <div className='px-20 pt-8 w-1/2 bg-white'>
            <div className='text-[#1D8D2E] items-center px-3 py-1.5 flex gap-2'>
                <p className='bg-[#1D8D2E] h-3 w-3 rounded-full'> </p>
                <span>You’re all set up</span>
            </div>

            <div className='text-instrument-serif text-[65px] mt-4 leading-20'>
                Welcome to <br /> <span className='italic text-[#2828FA]'> MemoAI. </span>
            </div>

            <div className='text-[#808080] mt-8 font-medium text-[20px] w-80'>
                Your AI-powered meeting
                companion. Record any
                conversation and Memo
                automatically transcribes it.
                extract key insights, and creates 
                action items - so you never miss a
                thing. 
            </div>

            <div className='flex mt-5 p-2 border rounded-2xl w-100 border-[#EBEBEB] gap-4'>
                <p> </p>
                <span className='flex text-[#2B2B2B] text-[20px]'>
                   <p className='flex items-center gap-2'> <FiUser className="text-gray-500 text-lg" /> Signed in as  <span className='font-semibold'> Philip Joy</span></p>
                </span>
            </div>

            <Link to="/Login">
                <div className='mt-5 bg-[#2828FA] w-100 rounded-2xl text-white text-[32px] font-semibold py-3 px-10'>
                    Get Started {'>'}
                </div>
            </Link>

        </div>
        
        <div className="lg:w-1/2 pt-8 flex justify-center items-center align-middle text-center  bg-[#EAF3FF] ">
            <div className='flex flex-col '>
                <div>
                    <div className='flex items-center gap-3 bg-white rounded-2xl p-6  '>
                        <div className='p-2.5 h-15 rounded-2xl w-15 bg-[#FEE2E2]  '>
                            <FiRadio className="text-[#FB2126] size-10" />                        </div>

                        <div className='text-start'>
                            <p className='text-[#2B2B2B] text-[25px] font-semibold '>Record </p>
                            <p className='text-[#A1A8B3] text-[21px] font-medium '>Meetings, lectures, interviews</p>
                        </div>
                    </div>
                    <div className='mt-6 '>
                        ..
                    </div>
                </div>
            

                <div>
                    <div className='flex items-center gap-3 bg-white rounded-2xl p-6  '>
                        <div className='py-1 h-15 rounded-2xl text-[33px] text-[#2828FA] w-15 bg-[#EFF6FF]  '>
                            T
                        </div>

                        <div className='text-start'>
                            <p className='text-[#2B2B2B] text-[25px] font-semibold'>Trancribe </p>
                            <p className='text-[#A1A8B3] text-[21px] font-medium '>AI-powered, instant accuracy</p>
                        </div>
                    </div>
                    <div className='mt-6 '>
                        ..
                    </div>

                </div>

                <div>
                    <div className='flex items-center gap-3 bg-white rounded-2xl pl-8 pr-12 py-8  '>
                        <div className='py-3 px-3 h-15 rounded-2xl text-[33px] text-[#2828FA] w-15 bg-[#F0FDF4]  '>
                            <FaCheck className="text-[#1D8D2E] text-l" />
                            
                        </div>

                        <div className='text-start'>
                            <p className='text-[#2B2B2B] text-[25px] font-semibold' >Summarize </p>
                            <p className='text-[#A1A8B3] text-[21px] font-medium '>Key points & action items</p>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Onboarding