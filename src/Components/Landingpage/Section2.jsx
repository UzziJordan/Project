import React from 'react'
import line1 from '../../Images/line1.svg'
import line2 from '../../Images/line2.svg'
import step1 from '../../Images/step1.svg'
import step2 from '../../Images/step2.svg'
import step3 from '../../Images/step3.svg'

const Section2 = () => {
  return (
    <div className='flex flex-col items-center gap-4 text-geist mt-8 md:mt-6 lg:mt-17.5'>
        <div className='h-8 w-31 bg-[#2828FA]/10 mt-6 rounded-2xl '>
          <p className=' text-[#2828FA] text-[13px] font-semibold text-center py-1.5'>HOW IT WORKS</p>
        </div>
        <div className='w-85 pt-4.75 text-center items-center  md:pt-3.25 md:w-150 lg:pt-4'>
          <p className='text-[32px] font-bold'>Everything you need from a meeting. Nothing you don't.</p>
          <p className='text-[16px] text=[#6B7280] w-66.5 mx-auto md:w-112.75'>Built for professionals who are tired of drowning in recordings and scribbled notes.</p>
        </div>

        <div className="flex flex-col gap-5 md:flex md:flex-col md:gap-10 lg:flex-row lg:gap-40 mt-20">

          <div className="flex flex-col gap-5 md:flex md:flex-row md:gap-40 lg:flex-row items-start justify-center lg:gap-40">
            {/* STEP 1 */}
            <div className="flex flex-col items-center text-center w-60">
              
              <div className="h-8 w-24 bg-[#2828FA]/10 rounded-2xl text-[#2828FA] font-semibold flex items-center justify-center">
                STEP - 01
              </div>

              <div className="pt-4 mb-0">
                <p className="text-[#1F2937] text-[25px] font-bold">Record</p>
                <p className="text-[#6B7280] text-[16px]">
                  Tap record during meetings, lectures, or interviews.
                </p>
              </div>

              <div className=" ">
                <img src={line1} alt="line" />
              </div>

              <div className="bg-[#F5F5FD] w-67.5 h-45 flex items-center justify-center">
                <img className="w-30" src={step1} alt="img" />
              </div>

            </div>


            {/* STEP 2 */}
            <div className="flex flex-col items-center text-center w-60">

              <div className=" ">
                <img src={line2} alt="line" />
              </div>

              <div className="h-8 w-24 bg-[#2828FA]/10 rounded-2xl text-[#2828FA] font-semibold flex items-center justify-center mt-5">
                STEP - 02
              </div>

              <div className="pt-4">
                <p className="text-[#1F2937] text-[25px] font-bold">Transcribe</p>
                <p className="text-[#6B7280] text-[16px]">
                  Memo AI converts speech into accurate searchable text.
                </p>
              </div>

              <div className="bg-[#F5F5FD] w-67.5 h-45 flex items-center justify-center mt-6">
                <img className="w-30" src={step2} alt="img" />
              </div>

            </div>

          </div>

          {/* STEP 3 */}
          <div className="flex flex-col items-center text-center w-60 md:mx-auto">

            <div className="h-8 w-24 bg-[#2828FA]/10 rounded-2xl text-[#2828FA] font-semibold flex items-center justify-center">
              STEP - 03
            </div>

            <div className="pt-4">
              <p className="text-[#1F2937] text-[25px] font-bold">Summarize</p>
              <p className="text-[#6B7280] text-[16px]">
                Get smart summaries, keypoints and action items in seconds.
              </p>
            </div>

            <div className=" ">
              <img src={line1} alt="line" />
            </div>

            <div className="bg-[#F5F5FD] w-67.5 h-45 flex items-center justify-center">
              <img className="w-30" src={step3} alt="img" />
            </div>

          </div>

        </div>
    </div>
  )
}

export default Section2