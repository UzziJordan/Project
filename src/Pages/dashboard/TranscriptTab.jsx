import React from 'react'
import { FiSearch } from "react-icons/fi";


const TranscriptTab = () => {
  return (
    <div className="p-6 grid grid-cols-3 gap-6">

      {/* LEFT PANEL */}
      <div className="bg-white rounded-xl border p-4 space-y-4">

        <div>
          <p className="font-semibold">Digital Marketing Meeting</p>
          <p className="text-sm text-gray-500">Feb 20 · 35 min</p>
        </div>

        {/* Fake waveform */}
        <div className="h-16 bg-gray-100 rounded-lg"></div>

        {/* Player */}
        <div>
          <p className="text-sm mb-1">Digital Marketing Meeting</p>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="w-1/3 h-2 bg-indigo-500 rounded"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">14:22 / 35:00</p>
        </div>

        {/* Speakers */}
        <div>
          <p className="font-medium mb-2">Speakers</p>

          <div className="flex items-center justify-between mb-2">
            <span>Harriet Davis</span>
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
              Host
            </span>
          </div>

          <p className="text-sm text-gray-600">Uzzi John</p>
          <p className="text-sm text-gray-600">John Doe</p>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-2 bg-white rounded-xl border p-4">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold">Transcript</p>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                placeholder="Search"
                className="bg-transparent outline-none text-sm"
              />
            </div>

            <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
              Copy all
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-6 text-sm">

          <div>
            <p className="font-medium">Harriet Davis</p>
            <p className="text-gray-600">
              Good afternoon everyone, thanks for joining.
              Let’s quickly go over the digital marketing roadmap for Q2.
            </p>
          </div>

          <div>
            <p className="font-medium">Uzzi John</p>
            <p className="text-gray-600">
              Afternoon Harriet, I’m ready. We finalized the priorities last week right?
            </p>
          </div>

          <div>
            <p className="font-medium">Harriet Davis</p>
            <p className="text-gray-600">
              Sounds good. Action items: Sarah – finish content migration by April 15.
            </p>
          </div>

          {/* Highlight */}
          <div>
            <p className="font-medium">Harriet Davis</p>
            <p className="bg-green-100 inline-block px-1">
              Perfect. Next: social media campaign.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default TranscriptTab