import React from 'react';

/**
 * Section7 Component
 * Purpose: Displays user testimonials and reactions to Memo AI.
 */
const Section7 = () => {
    // --- RENDER ---
    return (
        <div className='bg-[#EFF2F9] h-350 items-center lg:items-start lg:h-160 px-5 md:pl-25 md:pr-10 flex flex-col pt-8 text-geist'>
            {/* HEADER SECTION */}
            <div className='w-65 md:w-102.75 text-center lg:text-start'>
                <div className='w-35.5 h-10 mx-auto lg:mx-0 bg-[#D4D4FE] text-[#2828FA] rounded-4xl font-semibold text-[14px]'>
                    <p className='p-2'>EARLY REACTIONS</p>
                </div>
                <h1 className='font-bold text-[#1F2937] text-[32px] pt-2'>What People Are Saying About Memo?</h1>
                <p className='text-[#6B7280] text-[16px]'>Early testers have been putting Memo through its paces. </p>
                <p className='text-[#6B7280] text-[16px]'>Here's what they're telling us.</p>
            </div>

            {/* TESTIMONIALS SECTION */}
            <div className='flex flex-col lg:flex-row gap-8 mt-6 items-center'>
                {/* Testimonial 1 */}
                <div className='w-90 h-82 rounded-2xl border border-[#D4D4FE] px-8 py-4'>
                    <div className='flex flex-col gap-0'>
                        <p className='text-[62px] h-8 font-semibold mb-0 leading-none'>" </p>
                        <p className='font-semibold text-[18px] mt-0 text-[#1F2937]'>Absolute game-changer for my lectures. I used to spend Sunday afternoons re-watching two hours of recorded class, now I just read the summary in two minutes and move on. My grades haven't suffered, but my stress has.”</p>
                    </div>
                    <div className='mt-2 flex items-center gap-4'>
                        <div className='h-12 w-12 bg-[#D9D9D9] rounded-full'></div>
                        <div className='flex-col'>
                            <p className='text-[#2828FA] text-[16px]'>Amara O</p>
                            <p className='text-[#6B7280] text-[12px]'>Graduate Student of <span className='text-[#6B7280]'> Michigan University</span></p>
                        </div>
                    </div>
                </div>

                {/* Testimonial 2 */}
                <div className='bg-[#FFFFFF] w-90 h-82 rounded-2xl border border-[#D4D4FE] px-8 py-4'>
                    <div className='flex flex-col gap-0'>
                        <p className='text-[62px] h-8 font-semibold mb-0 leading-none'>" </p>
                        <p className='font-semibold text-[18px] mt-0 text-[#1F2937]'>Absolute game-changer for my lectures. I used to spend Sunday afternoons re-watching two hours of recorded class, now I just read the summary in two minutes and move on. My grades haven't suffered, but my stress has.”</p>
                    </div>
                    <div className='mt-2 flex items-center gap-4'>
                        <div className='h-12 w-12 bg-[#D9D9D9] rounded-full'></div>
                        <div className='flex-col'>
                            <p className='text-[#2828FA] text-[16px]'>Amara O</p>
                            <p className='text-[#6B7280] text-[12px]'>Graduate Student of <span className='text-[#6B7280]'> Michigan University</span></p>
                        </div>
                    </div>
                </div>

                {/* Testimonial 3 */}
                <div className='w-90 h-82 rounded-2xl border border-[#D4D4FE] px-8 py-4'>
                    <div className='flex flex-col gap-0'>
                        <p className='text-[62px] h-8 font-semibold mb-0 leading-none'>" </p>
                        <p className='font-semibold text-[18px] mt-0 text-[#1F2937]'>Absolute game-changer for my lectures. I used to spend Sunday afternoons re-watching two hours of recorded class, now I just read the summary in two minutes and move on. My grades haven't suffered, but my stress has.”</p>
                    </div>
                    <div className='mt-2 flex items-center gap-4'>
                        <div className='h-12 w-12 bg-[#D9D9D9] rounded-full'></div>
                        <div className='flex-col'>
                            <p className='text-[#2828FA] text-[16px]'>Amara O</p>
                            <p className='text-[#6B7280] text-[12px]'>Graduate Student of <span className='text-[#6B7280]'> Michigan University</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section7;
