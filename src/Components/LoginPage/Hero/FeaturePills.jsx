import React from 'react';

/**
 * FeaturePills Component
 * Purpose: Displays a set of feature highlights in a pill-shaped UI element.
 */
const FeaturePills = () => {
    // --- RENDER ---
    return (
        <div className="flex gap-3 mt-10 text-geist">
            {/* 1-click recording Pill */}
            <span className="bg-[#FFFFFF]/7 border-2 border-[#FFFFFF]/10 text-[12px] px-4 py-2 rounded-full">
                🎙️1-click recording 
            </span>

            {/* AI transcription Pill */}
            <span className="bg-[#FFFFFF]/7 border-2 border-[#FFFFFF]/10 text-[12px] px-4 py-2 rounded-full"> 
                ⚡ AI transcription 
            </span>

            {/* Smart summaries Pill */}
            <span className="bg-[#FFFFFF]/7 border-2 border-[#FFFFFF]/10 text-[12px] px-4 py-2 rounded-full"> 
                ✦ Smart summaries 
            </span>
        </div>
    );
};

export default FeaturePills;
