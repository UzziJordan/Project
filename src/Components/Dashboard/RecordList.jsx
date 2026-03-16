import React from 'react'
import divrec from '../../Images/divrec.svg'

const RecordList = () => {
  return (
    <div className='hidden'>

      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-[16px]">Recent Recordings</h2>
        <span className="text-[14px] text-[#4B5563] font-semibold cursor-pointer">
          View all →
        </span>
      </div>

      <div className="space-y-4">

        <div className="bg-white px-6 py-8 rounded-xl flex justify-between items-center">
            <div className='flex gap-6'>
                <div>
                    <img src={divrec} alt="" />
                </div>

                <div className=' '>
                    <h3 className="font-semibold text-[16px]">
                        Q4 Product Strategy Meeting
                    </h3>

                    <p className="text-[14px] text-[#9CA3AF] flex gap-5">
                        Today, 2:30 PM  <span>47 min</span>  <span className='text-[#3B82F6]'>Transcribed ✓</span>
                    </p>
                </div>
            </div>

            <div className='flex gap-5'>
                <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    Product
                </span>

                <span className="text-[14px] text-[#4B5563] cursor-pointer">
                    View →
                </span>
            </div>
          
        </div>


      </div>

    </div>
  );
}

export default RecordList