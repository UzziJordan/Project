import React from 'react';
import Phone from '../../Images/Phone.svg';
import imagep1 from '../../Images/imagep1.svg';
import imagep2 from '../../Images/imagep2.svg';
import imagep3 from '../../Images/imagep3.svg';

/**
 * Section1 Component
 * Purpose: Hero section of the landing page featuring the main value proposition and CTA.
 */
const Section1 = () => {
    // --- RENDER ---
    return (
        <div className='bg-[#EFF2F9] text-geist pb-[48.28px] px-4 pt-6 flex flex-col justify-between md:px-33 md:pt-12 lg:px-[5vw] lg:pt-22 lg:flex-row'>
            {/* CONTENT CONTAINER */}
            <div className='flex flex-col justify-center lg:w-[50%]'>
                {/* BADGE */}
                <div className='bg-[#E9E9FF] w-60.5 h-8.25 text-[#2828FA] rounded-2xl text-center items-center align-middle'>
                    <p className='py-1.5 text-dm-sans font-semibold text-[13px]'>• AI-POWERED MEETING NOTES</p>
                </div>
                
                {/* HEADING */}
                <p className='text-geist font-bold text-[50px] h-60 leading-[-1%] md:text-[65px] md:h-51.25 lg:text-[60px] lg:w-110.25 lg:h-40'>
                    Your meetings <span className='text-[#2828FA] underline mb-0'>summarized</span>
                </p>
                
                {/* DESCRIPTION */}
                <div className='text-[#6B7280] text-[16px] w-79 pt-0 md:text-[18px] md:w-110 lg:text-[15px] lg:w-108 lg:mt-4.25'>
                    <p>Memo records your meetings, lectures, and interviews then instantly delivers AI-generated transcripts, smart summaries, and action items. </p>
                    <p>Stop relistening, Start doing.</p>
                </div>
                
                {/* CTA BUTTON */}
                <div className='pt-6 font-semibold md:pt-8'>
                    <button className='bg-[#2828FA] text-[#FFFFFF] flex text-center items-center align-middle text-[17px] gap-2 px-4 py-2 rounded-xl h-15 w-60'>
                        <img className='pl-5' src={Phone} alt="Phone" />
                        <span>Join the Waitlist</span>
                    </button>
                </div>
                
                {/* USER COUNT */}
                <div className='flex text-center items-center gap-2 py-6 text-[12px] w-87'>
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#60A5FA] to-[#3B82F6] flex items-center justify-center text-white font-semibold border-2 border-white"> A </div>
                        <div className="-ml-3 w-8 h-8 rounded-full bg-linear-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-white font-semibold border-2 border-white"> M </div>
                        <div className="-ml-3 w-8 h-8 rounded-full bg-linear-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white font-semibold border-2 border-white"> R </div>
                        <div className="-ml-3 w-8 h-8 rounded-full bg-linear-to-br from-[#FB923C] to-[#EA580C] flex items-center justify-center text-white font-semibold border-2 border-white"> S </div>
                    </div>
                    <p className='text-[#6B7280]'>Join <span className='text-[#1F2937]'>2,400+</span> early adopters on the waitlist</p>
                </div>
            </div>
            
            {/* IMAGES CONTAINER */}
            <div className="flex justify-center items-center pt-10 lg:w-[50%]">
                <img src={imagep1} alt="phone" className="w-56 -mb-25 -mr-20" />
                <img src={imagep2} alt="phone" className="w-64 z-10" />
                <img src={imagep3} alt="phone" className="w-56 -mb-25 -ml-20 z-20" />
            </div>
        </div>
    );
};

export default Section1;
