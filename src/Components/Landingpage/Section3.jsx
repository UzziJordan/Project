import React from 'react';
import { FaCheck } from "react-icons/fa";
import Card1 from '../../Images/Card1.svg';

const Section3 = () => {
  return (
    <div className='bg-[#EFF2F9] mt-18 w-full text-geist h-225 lg:h-125 '>
      
      {/* Main Container */}
      <div className='flex flex-col-reverse justify-center items-center align-middle py-12 gap-10 lg:gap-20 md:pt-5 lg:pt-10 lg:flex-row'>
        
        {/* Image */}
        <div className='w-150 h-100 md:mt-2'>
          <img src={Card1} alt="img" />
        </div>
        
        {/* Content */}
        <div className='w-95 h-100 text-center mx-auto lg:mx-0 lg:pt-3 lg:text-left '>
          
          {/* Badge */}
          <div className='h-10.5 w-25 mx-auto bg-[#2828FA]/10 rounded-3xl text-center items-center lg:mx-0'>
            <p className='font-semibold text-[14px] text-[#2828FA] py-2.5'>WHY MEMO</p>
          </div>
          
          {/* Heading and Description */}
          <div className='lg:pt-4'>
            <h1 className='font-bold text-[32px] w-46.5 mx-auto lg:mx-0'>Save Hours Every Week</h1>
            <p className='text-[15px] text-[#6B7280]'>Stop relistening to hour-long recordings. Memo's AI delivers a concise 3 – 5 bullet summary in seconds, so you get the full picture without replaying a single second.</p>
          </div>
          
          {/* Checkpoints */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="flex gap-4 mx-auto lg:mx-0 lg:gap-4 text-[14px] text-right font-medium">
              <span className="flex items-center justify-center w-5 h-5 bg-green-800 rounded-full">
                <FaCheck className="text-white text-l" />
              </span>
              Skip the playback. Keep the value.
            </p>
            <p className="flex gap-4 mx-auto lg:mx-0 lg:gap-4 text-[14px] text-right font-medium">
              <span className="flex items-center justify-center w-5 h-5 bg-green-800 rounded-full">
                <FaCheck className="text-white text-l" />
              </span>
              Your time, reclaimed.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className='bg-[#2828FA] text-[#FFFFFF] text-center w-40 h-12 flex items-center justify-center rounded-4xl mt-14 mx-auto md:mt-8 lg:mx-0'>
            <p>Discover More</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
