import React from 'react'

const MeetingCard = () => {
  return (
    <div className="bg-white/10 rounded-xl p-6 w-95 backdrop-blur">

      <div className="flex justify-between text-sm mb-4">
        <span>Q4 Strategy Meeting</span>
        <span className="text-blue-200">14:22</span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-2 bg-white/20 rounded"></div>
        <div className="h-2 bg-white/20 rounded w-4/5"></div>
        <div className="h-2 bg-white/20 rounded w-3/5"></div>
      </div>

      <div className="flex gap-2 text-xs">
        <span className="bg-white/20 px-2 py-1 rounded">Summary ready</span>
        <span className="bg-white/20 px-2 py-1 rounded">3 tasks</span>
        <span className="bg-white/20 px-2 py-1 rounded">3 speakers</span>
      </div>

    </div>
  )
}

export default MeetingCard