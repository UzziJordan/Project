import React from 'react';
import { Link } from "react-router-dom";

const RecordBanner = () => {
  return (
    <div className="bg-[#2828FA] text-white px-6 md:px-8 py-6 md:py-7 mb-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
      
      {/* Banner Content */}
      <div className="max-w-md">
        <h2 className="text-[18px] md:text-[20px] font-bold">Ready to record?</h2>
        <p className="text-[13px] md:text-[14px] opacity-70">Memo will transcribe and summarize everything automatically.</p>
      </div>
      
      {/* Record Button */}
      
      <Link to="recording" className="w-full md:w-auto">
        
        <button className="bg-white w-full md:w-auto flex items-center justify-center gap-2 text-[#2828FA] px-5 py-3 rounded-lg font-medium transition-transform active:scale-95">
          <p className='w-4 h-4 rounded-full bg-[#2828FA]'></p>
          Start Recording
        </button>
      
      </Link>
    
    </div>
  );
};
export default RecordBanner