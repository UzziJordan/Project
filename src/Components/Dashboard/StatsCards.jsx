import React from 'react'

const StatsCards = () => {
  return (
  <div className="grid  grid-cols-3 gap-6 mb-5 mt-2">

    <div className="bg-white px-6 rounded-xl shadow-sm pb-5">
      <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold ">TOTAL RECORDINGS</p>
      <h2 className="text-[28px] text-[#111827] font-bold">0</h2>
      <p className="text-[12px] text-[#9CA3AF] ">↑ 0 this week</p>
    </div>

    <div className="bg-white px-6 rounded-xl shadow-sm pb-5">
      <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold ">HOURS RECORDED</p>
      <h2 className="text-[28px] text-[#111827] font-bold">0h </h2>
      <p className="text-[12px] text-[#9CA3AF] ">↑ 0h this week</p>
    </div>

    <div className="bg-white px-6 rounded-xl shadow-sm pb-5">
      <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold ">PENDING TASKS</p>
      <h2 className="text-[28px] text-[#111827] font-bold">0h </h2>
      <p className="text-[12px] text-[#9CA3AF] ">↑ From 0 Meatings</p>
    </div>

  </div>  )
}

export default StatsCards