import React from 'react'

const Summary = () => {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">
            Digital Marketing Meeting
          </h2>
          <p className="text-sm text-gray-500">
            Tue, 23 Aug · 35 min · 3 Speakers
          </p>
        </div>

        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          ✦ AI Generated
        </span>
      </div>

      {/* Meeting Summary */}
      <div className="bg-white rounded-xl border p-5">
        <p className="font-semibold mb-3">Meeting Summary</p>

        <ul className="space-y-3 text-sm">
          <li className="flex gap-2">
            <span className="text-blue-500">•</span>
            Website Relaunch is the top priority for Q2 – new design must go live by end of April (target: April 30).
          </li>

          <li className="flex gap-2">
            <span className="text-blue-500">•</span>
            Content migration led by Sarah, on track to finish by April 15, followed immediately by testing phase.
          </li>

          <li className="flex gap-2">
            <span className="text-blue-500">•</span>
            Social media campaign assets (graphics + copy) due from John by March 20 – first batch to be shared in shared folder this week.
          </li>

          <li className="bg-green-100 px-2 py-1 rounded inline-block">
            Website Relaunch is the top priority for Q2 – new design must go live by end of April (target: April 30).
          </li>
        </ul>
      </div>

      {/* Two Cards */}
      <div className="grid grid-cols-2 gap-6">

        {/* Key Decisions */}
        <div className="bg-white rounded-xl border p-4">
          <p className="font-semibold mb-3">Key Decisions</p>

          <ul className="space-y-2 text-sm">
            <li>• Add buffer weeks to the ML pipeline timeline</li>
            <li>• Combine technical + security reviews in one session</li>
            <li>• Finalize onboarding flows — no further changes</li>
          </ul>
        </div>

        {/* Open Questions */}
        <div className="bg-white rounded-xl border p-4">
          <p className="font-semibold mb-3">Open Questions</p>

          <ul className="space-y-2 text-sm">
            <li>• Add buffer weeks to the ML pipeline timeline</li>
            <li>• Combine technical + security reviews in one session</li>
            <li>• Finalize onboarding flows — no further changes</li>
          </ul>
        </div>

      </div>

      {/* Bottom List */}
      <div className="bg-white rounded-xl border p-4">
        <p className="font-semibold mb-3">Key Decisions</p>

        <div className="space-y-2">
          <div className="bg-gray-100 p-3 rounded-lg">
            Add buffer weeks to the ML pipeline timeline
          </div>

          <div className="bg-gray-100 p-3 rounded-lg">
            Combine technical + security reviews in one session
          </div>

          <div className="bg-gray-100 p-3 rounded-lg">
            Finalize onboarding flows — no further changes
          </div>
        </div>
      </div>

    </div>
  )
}

export default Summary