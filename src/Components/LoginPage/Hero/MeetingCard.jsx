import React from 'react';

/**
 * MeetingCard Component
 * Purpose: Visual representation of a recorded meeting with progress indicators and status tags.
 */
const MeetingCard = () => {
    // --- RENDER ---
    return (
        <div className="w-80 md:w-100 rounded-4xl border-[#FFFFFF]/10 border-2 mt-5 p-6 bg-[#FFFFFF]/6 text-geist">
            {/* HEADER SECTION */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#F87171] rounded-full"></div>
                    <p className="text-[13px] font-semibold text-[#FFFFFF]/90"> Q4 Strategy Meeting </p>
                </div>
                
                <p className="text-[#FFFFFF]/35 text-[11px] text-jetbrains-mono">14:22</p>
            </div>
            
            {/* PROGRESS VISUALIZATION */}
            <div className="space-y-2">
                <div className="h-2 w-full bg-blue-300/40 rounded-full"></div>
                <div className="h-2 w-[85%] bg-gray-300/30 rounded-full"></div>
                <div className="h-2 w-[92%] bg-gray-300/30 rounded-full"></div>
                <div className="h-2 w-[60%] bg-blue-300/40 rounded-full"></div>
                <div className="h-2 w-[80%] bg-gray-300/30 rounded-full"></div>
            </div>
            
            {/* STATUS TAGS */}
            <div className="flex gap-3 mt-4">
                <div className="px-2 py-1 rounded-full bg-[#3B82F6]/25 border border-[#3B82F6]/40 text-[#93C5FD] text-[10px] font-semibold"> ✦ Summary ready </div>
                <div className="px-2 py-1 rounded-full bg-[#3B82F6]/25 border border-[#3B82F6]/40 text-[#93C5FD] text-[10px] font-semibold"> ☑ 3 tasks </div>
                <div className="px-2 py-1 rounded-full bg-[#FFFFFF]/5 border border-[#FFFFFF]/10 text-[#FFFFFF]/50 text-[10px] font-semibold"> 47 min </div>
                <div className="px-2 py-1 rounded-full bg-[#FFFFFF]/5 border border-[#FFFFFF]/10 text-[#FFFFFF]/50 text-[10px] font-semibold"> 3 speakers </div>
            </div>
        </div>
    );
};

export default MeetingCard;
