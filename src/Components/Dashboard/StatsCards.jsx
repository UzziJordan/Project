import React from 'react'

const StatsCards = () => {
  return (
  <div className="grid  grid-cols-3 gap-6">

    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">TOTAL RECORDINGS</p>
      <h2 className="text-2xl font-bold">48</h2>
      <p className="text-xs text-gray-400">+ 6 this week</p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">HOURS RECORDED</p>
      <h2 className="text-2xl font-bold">34.2h</h2>
      <p className="text-xs text-gray-400">+ 4.1h this week</p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">PENDING TASKS</p>
      <h2 className="text-2xl font-bold">5</h2>
      <p className="text-xs text-gray-400">From 3 meetings</p>
    </div>

  </div>  )
}

export default StatsCards