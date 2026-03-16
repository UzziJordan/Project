import React from 'react'
import { FiUpload, FiMoreHorizontal } from "react-icons/fi";
import divrec from '../../Images/divrec.svg'

const RecordHistory = () => {
  return (
    <div className='px-18 mt-8'>
        <div className="bg-white border-2 border-[#EBEBEB] rounded-xl overflow-hidden">

            {/* Header */}
            <div className="grid grid-cols-5 px-6 py-3 bg-[#EFF2F9] text-[14px] font-semibold text-[#808080]">
                <div className="col-span-2">TITLE</div>
                <div>DATE</div>
                <div>DURATION</div>
                <div>TAGS</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-5 items-center px-6 py-4">
                <div className="col-span-2 flex items-center gap-3">
                <div>
                    <img src={divrec} alt="" />
                </div>
                <p>Digital Marketing Meeting</p>
                </div>

                <div>Mar 10, 2026</div>
                <div>47:00</div>

                <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Product
                </span>

                <div className="flex gap-2">
                    <button className="p-2 border rounded-lg">
                    <FiUpload />
                    </button>

                    <button className="p-2 border rounded-lg">
                    <FiMoreHorizontal />
                    </button>
                </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-5 items-center px-6 py-4">
                <div className="col-span-2 flex items-center gap-3">
                <div>
                    <img src={divrec} alt="" />
                </div>
                <p>Interview: Sarah Chen – UX Designer</p>
                </div>

                <div>Mar 10, 2026</div>
                <div>47:00</div>

                <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    Interview
                </span>

                <div className="flex gap-2">
                    <button className="p-2 border rounded-lg">
                    <FiUpload />
                    </button>

                    <button className="p-2 border rounded-lg">
                    <FiMoreHorizontal />
                    </button>
                </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default RecordHistory