import React from 'react'
import Searchbar from '../../Components/Dashboard/Searchbar'

const ToDoList = () => {
  return (
    <div>

        <Searchbar />

        <div className="pt-7 px-18 ">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">To-Do List</h1>
                    <div className="flex gap-3 mt-2 text-gray-500 text-sm">
                        <p>0 pending</p>
                        <p>0 completed</p>
                        <p>from 0 meetings</p>
                    </div>
                </div>

                <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg">
                    + Add Task
                </button>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white border border-[#EBEBEB] rounded-xl p-7 mt-3">
                <div className="flex justify-between text-sm mb-2">
                <span>Weekly Progress</span>
                <span className="text-indigo-600 font-medium">0 / 8</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded">
                <div className="w-0/8 h-2 bg-indigo-600 rounded"></div>
                </div>
            </div>

            {/* Pending */}
            <div className='mt-8'>
                <p className="text-gray-400 text-sm font-semibold mb-3">PENDING</p>

                <div className="space-y-3 hidden">

                    {/* Task */}
                    <div className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex justify-between items-center">
                        <div className="flex items-start gap-3">
                            <div className='items-center'>
                                <input type="checkbox" />
                            </div>

                            <div>
                                <p>Update shared doc with new ad budget numbers</p>
                                <div className='flex gap-2'>
                                    <p className='text-[15px] font-medium h-5 w-5 px-1 bg-[#2828FA] rounded-full'>S</p>
                                    <p className="text-sm text-gray-500">Sarah</p>
                                </div>
                            </div>
                        </div>

                        <span className="bg-[#D4D4FE] text-[#2828FA] text-xs px-3 py-1 rounded-full">
                        Product
                        </span>
                    </div>
                </div>
            </div>

            {/* Completed */}
            <div className='mt-8'>
                <p className="text-gray-400 text-sm font-semibold mb-3">COMPLETED</p>

                <div className="bg-white border hidden border-[#EBEBEB] rounded-xl p-6  justify-between items-center">
                
                    <div className="flex items-start gap-3">
                    
                        <div className='items-center'>
                            <input type="checkbox" checked readOnly />
                        </div>
                    
                    <div>
                        <div className='line-through text-[#808080]'>
                            <p>Update shared doc with new ad budget numbers</p>
                            <div className='flex gap-2 '>
                                <p className='text-[15px] font-medium h-5 w-5 px-1 bg-[#2828FA] rounded-full'>S</p>
                                <p className="text-sm text-gray-500">Sarah</p>
                            </div>
                        </div>
                    </div>
                </div>

                <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full">
                    Done
                </span>
                </div>
            </div>


        </div>


    </div>
  )
}

export default ToDoList