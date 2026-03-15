import React from 'react';

const FeaturePills = () => {
  return (
    <div className="flex gap-3 mt-10 text-geist">
      {/* Feature Pills Container */}
      <span className="bg-[#FFFFFF]/7 border-2 border-[#FFFFFF]/10 text-[12px] px-4 py-2 rounded-full">
        🎙️1-click recording 
      </span>

      <span className="bg-[#FFFFFF]/7 border-2 border-[#FFFFFF]/10 text-[12px] px-4 py-2 rounded-full"> 
        ⚡ AI transcription 
      </span>

      <span className="bg-[#FFFFFF]/7 border-2 border-[#FFFFFF]/10 text-[12px] px-4 py-2 rounded-full"> 
        ✦ Smart summaries 
      </span>
      
    </div>
  );
};

export default FeaturePills;
