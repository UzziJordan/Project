import React from 'react'
import Searchbar from '../../Components/Dashboard/Searchbar'

const ToDoList = () => {
  return (
    <div className=" ">

        <Searchbar />


      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">To-Do List</h1>
          <p className="text-gray-500 text-sm">
            5 pending · 3 completed from 4 meetings
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          + Add Task
        </button>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Weekly Progress</span>
          <span className="text-indigo-600 font-medium">3 / 8</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded">
          <div className="w-1/3 h-2 bg-indigo-600 rounded"></div>
        </div>
      </div>

      {/* Pending */}
      <div>
        <p className="text-gray-400 text-sm font-semibold mb-3">PENDING</p>

        <div className="space-y-3">

          {/* Task */}
          <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-start gap-3">
              <input type="checkbox" />
              <div>
                <p>Update shared doc with new ad budget numbers</p>
                <p className="text-sm text-gray-500">Sarah</p>
              </div>
            </div>

            <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
              Product
            </span>
          </div>

          <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-start gap-3">
              <input type="checkbox" />
              <div>
                <p>Deliver creative assets for social campaign</p>
                <p className="text-sm text-gray-500">John</p>
              </div>
            </div>

            <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
              Product
            </span>
          </div>

          <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-start gap-3">
              <input type="checkbox" />
              <div>
                <p>Draft & share first email nurture sequence</p>
                <p className="text-sm text-gray-500">Temi</p>
              </div>
            </div>

            <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
              Product
            </span>
          </div>

        </div>
      </div>

      {/* Completed */}
      <div>
        <p className="text-gray-400 text-sm font-semibold mb-3">COMPLETED</p>

        <div className="bg-white border rounded-xl p-4 flex justify-between items-center opacity-60">
          <div className="flex items-start gap-3">
            <input type="checkbox" checked readOnly />
            <div>
              <p className="line-through">
                Update shared doc with new ad budget numbers
              </p>
              <p className="text-sm text-gray-500">Sarah</p>
            </div>
          </div>

          <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full">
            Done
          </span>
        </div>
      </div>

    </div>
  )
}

export default ToDoList