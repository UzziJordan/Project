import React from 'react';
import { FaCheck } from "react-icons/fa";
import { FiUser, FiRadio } from "react-icons/fi";
import { Link } from 'react-router-dom';

import arrow from '../Images/arrrow.svg'

const Onboarding = () => {
  return (
    <div className="max-h-screen lg:h-256 flex flex-col lg:flex-row text-geist">
      {/* Left Section */}
      <div className='px-20 pt-20 w-1/2 bg-white'>
        <div className='text-[#000000] bg-[#ECECEC] rounded-2xl w-33 items-center px-3 py-1.5 flex gap-2'>
          <p className='bg-[#1D8D2E] h-2 w-2 rounded-full'></p>
          <span className='text-[12px] font-medium'>You’re all set up</span>
        </div>
        <div className='text-instrument-serif text-[48px] mt-8 leading-15'>
          Welcome to <br />
          <span className='italic text-[#2828FA]'> MemoAI. </span>
        </div>
        <div className='text-[#808080] my-12 font-medium text-[16px] w-95'>
          Your AI-powered meeting companion. Record any conversation and Memo automatically transcribes it, extract key insights, and creates action items - so you never miss a thing.
        </div>

        <div className='flex mt-5 p-6 border rounded-2xl w-65 border-[#EBEBEB] gap-4'>
          <span className='flex text-[#2B2B2B] text-[14px]'>
            <p className='flex items-center gap-2'>
              <FiUser className="text-gray-500 text-lg" />
              Signed in as <span className='font-semibold'> Philip Joy</span>
            </p>
          </span>
        </div>
        <Link to="/Login">
          <div className='mt-5 bg-[#2828FA] flex gap-6 w-65 rounded-2xl items-center text-white text-[14px] font-semibold py-3 px-10'>
            Get Started <span className='text-[30px] items-center'> › </span> 
          </div>
        </Link>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 pt-8 flex justify-center items-center align-middle text-center bg-[#EAF3FF]">
        
        <div className='flex flex-col'>
          
          <div>
            <div className='flex items-center gap-3 bg-white rounded-2xl p-6'>
              <div className='py-3 px-3 h-12 rounded-2xl w-12 bg-[#FEE2E2]'>
                <FiRadio className="text-[#FB2126] size-6" />
              </div>

              <div className='text-start'>
                <p className='text-[#2B2B2B] text-[16px] font-semibold'>Record</p>
                <p className='text-[#A1A8B3] text-[14px] font-medium'>Meetings, lectures, interviews</p>
              </div>
            </div>
            
            <div className='my-8 ml-35'> <img src={arrow} alt="" /> </div>
          </div>
          
          <div>
            <div className='flex items-center gap-3 bg-white rounded-2xl p-6'>
              <div className='py-2 h-12 rounded-2xl text-[22px] text-[#2828FA] w-12 bg-[#EFF6FF]'>
                T
              </div>
              
              <div className='text-start'>
                <p className='text-[#2B2B2B] text-[16px] font-semibold'>Trancribe</p>
                <p className='text-[#A1A8B3] text-[14px] font-medium'>AI-powered, instant accuracy</p>
              </div>
            </div>
            
            <div className='my-8 ml-35'> <img src={arrow} alt="" /> </div>
          </div>
          
          <div>
            <div className='flex items-center gap-3 bg-white rounded-2xl pl-8 pr-12 py-8'>
              <div className='py-4 px-4 h-12 rounded-2xl text-[#2828FA] w-12 bg-[#F0FDF4]'>
                <FaCheck className="text-[#1D8D2E] " />
              </div>
              <div className='text-start'>
                <p className='text-[#2B2B2B] text-[16px] font-semibold'>Summarize</p>
                <p className='text-[#A1A8B3] text-[14px] font-medium'>Key points & action items</p>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};
export default Onboarding;

