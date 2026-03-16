import React from 'react'

const RecordList = () => {
  return (
    <div>

      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Recent Recordings</h2>
        <span className="text-sm text-blue-600 cursor-pointer">
          View all →
        </span>
      </div>

      <div className="space-y-4">

        <div className="bg-white p-4 rounded-xl flex justify-between items-center">

          <div>
            <h3 className="font-medium">
              Q4 Product Strategy Meeting
            </h3>

            <p className="text-sm text-gray-500">
              Today, 2:30 PM • 47 min • Transcribed ✓
            </p>
          </div>

          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            Product
          </span>

        </div>

        <div className="bg-white p-4 rounded-xl flex justify-between items-center">

          <div>
            <h3 className="font-medium">
              Interview: Sarah Chen – UX Designer
            </h3>

            <p className="text-sm text-gray-500">
              Yesterday, 10:00 AM • 12 min
            </p>
          </div>

          <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
            Interview
          </span>

        </div>

      </div>

    </div>
  );
}

export default RecordList