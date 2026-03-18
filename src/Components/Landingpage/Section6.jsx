import React from 'react';
import Card4 from '../../Images/card4.svg';
import universe from '../../Images/universe.svg';
import reliable from '../../Images/reliable.svg';

/**
 * Section6 Component
 * Purpose: Showcases the versatility and reliability of Memo AI across different environments and scenarios.
 */
const Section6 = () => {
    // --- RENDER ---
    return (
        <div className='mt-18 w-full text-geist h-225 lg:h-125 '>
            {/* MAIN CONTAINER */}
            <div className='flex flex-col justify-center items-center align-middle py-12 gap-10 lg:gap-20 md:pt-5 lg:pt-10 lg:flex-row'>
                {/* CONTENT SECTION */}
                <div className='w-95 h-100 text-center mx-auto lg:mx-0 lg:pt-3 lg:text-left '>
                    {/* HEADING AND DESCRIPTION */}
                    <div className='lg:pt-4'>
                        <h1 className='font-bold text-[32px] w-75 mx-auto lg:mx-0'>Works Everywhere You Speak</h1>
                        <p className='text-[15px] text-[#6B7280]'>Meetings, lectures, interviews, brainstorms. Memo handles any audio scenario. Works offline, in noisy rooms, and across multiple speakers with speaker detection.</p>
                    </div>
                    
                    {/* BUTTONS */}
                    <div className='flex justify-between'>
                        <div className='bg-[#2828FA] text-[#FFFFFF] text-center w-40 h-12 flex items-center justify-center rounded-4xl mt-14 mx-auto md:mt-8 lg:mx-0'>
                            <p className='flex gap-4'>
                                <img src={universe} alt="Universal icon" />
                                <span>Universal</span>
                            </p>
                        </div>
                        <div className='bg-[#EFF2F9] text-[#000000] text-center w-40 h-12 flex items-center justify-center rounded-4xl mt-14 mx-auto md:mt-8 lg:mx-0'>
                            <p className='flex gap-4'>
                                <img src={reliable} alt="Reliable icon" />
                                <span>Reliable</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* IMAGE SECTION */}
                <div className='w-150 h-100'>
                    <img className='' src={Card4} alt="Memo AI in action" />
                </div>
            </div>
        </div>
    );
};

export default Section6;
