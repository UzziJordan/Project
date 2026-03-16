import React from 'react'

const RecordBanner = () => {
  return (
    <div className="bg-linear-to-r from-indigo-500 to-blue-600 text-white p-8 rounded-2xl flex justify-between items-center">

      <div>
        <h2 className="text-lg font-semibold">
          Ready to record?
        </h2>

        <p className="text-sm opacity-90">
          Memo will transcribe and summarize everything automatically.
        </p>
      </div>

      <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium">
        Start Recording
      </button>

    </div>
  )
}

export default RecordBanner