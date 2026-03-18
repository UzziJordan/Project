import React from 'react';
import { NavLink } from 'react-router-dom';
import FeaturePills from "./FeaturePills";
import MeetingCard from "./MeetingCard";

/**
 * HeroSection Component
 * Purpose: Main informational section on the login page showcasing the product's value proposition.
 */
const HeroSection = () => {
    // --- RENDER ---
    return (
        <div className="lg:w-1/2 w-full bg-[#24426A] md:px-40 lg:px-20 text-geist text-[#FFFFFF] flex flex-col justify-center lg:justify-normal px-5 py-17.5">
            {/* LOGO SECTION */}
            <NavLink to="/">
                <h1 className="text-[30px] font-semibold text-audiowide"> MEMO AI </h1>
            </NavLink>
            
            {/* BADGE SECTION */}
            <div className="bg-[#FFFFFF]/8 border-[#FFFFFF]/12 text-[#FFFFFF]/70 flex gap-2 h-8 w-65 border-2 text-[12px] font-medium py-2 items-center pl-4 mt-10 rounded-full">
                <div className='bg-[#4ADE80] h-2 w-2 rounded-full'> </div>
                AI-powered - No note-taking needed
            </div>
            
            {/* HEADING SECTION */}
            <h2 className="text-[48px] text-instrument-serif leading-tight mt-7">
                Your meetings, <br />
                <span className="italic text-[#93C5FD]"> finally remembered. </span>
            </h2>
            
            {/* DESCRIPTION SECTION */}
            <p className="text-[#FFFFFF] text-[16px] max-w-95 mt-5">
                Record any conversation. Memo transcribes it, extracts key decisions, and turns action items into tasks automatically.
            </p>
            
            {/* FEATURE HIGHLIGHTS */}
            <FeaturePills />
            
            {/* INTERACTIVE PREVIEW CARD */}
            <MeetingCard />
            
            {/* SOCIAL PROOF SECTION */}
            <div className='flex flex-row gap-3 mt-5'>
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#60A5FA] to-[#3B82F6] flex items-center justify-center text-white font-semibold border border-white"> A </div>
                    <div className="-ml-3 w-8 h-8 rounded-full bg-linear-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-white font-semibold border border-white"> M </div>
                    <div className="-ml-3 w-8 h-8 rounded-full bg-linear-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white font-semibold border border-white"> R </div>
                    <div className="-ml-3 w-8 h-8 rounded-full bg-linear-to-br from-[#FB923C] to-[#EA580C] flex items-center justify-center text-white font-semibold border border-white"> S </div>
                </div>

                <div>
                    <p>★★★★★</p>
                    <p className="text-[13px] text-[#FFFFFF]/45">
                        Trusted by <span className='text-[#FFFFFF]/75'> 12,000+ teams </span> worldwide
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
