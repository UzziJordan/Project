import React from 'react'

const RecordBanner = () => {
  return (
    <div className="bg-[#2828FA] text-white px-8 py-7 mb-3 rounded-2xl flex justify-between items-center">

      <div>
        <h2 className="text-[20px] font-bold">
          Ready to record?
        </h2>

        <p className="text-[14px] opacity-70">
          Memo will transcribe and summarize everything automatically.
        </p>
      </div>

      <button className="bg-white flex items-center gap-2 text-[#2828FA] px-5 py-3 rounded-lg font-medium">
        <p className='w-4 h-4 rounded-full bg-[#2828FA]'> </p>Start Recording
      </button>

    </div>
  )
}

export default RecordBanner