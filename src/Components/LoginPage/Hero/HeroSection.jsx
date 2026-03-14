import React from 'react'
import FeaturePills from "./FeaturePills";
import MeetingCard from "./MeetingCard";


const HeroSection = () => {
  return (
    <div className="lg:w-1/2 w-full bg-[#2E4C73] text-white flex flex-col justify-center px-20 py-20">

      <h1 className="text-2xl font-semibold tracking-widest mb-6">
        MEMO AI
      </h1>

      <span className="bg-white/10 text-sm px-3 py-1 rounded-full w-fit mb-8">
        AI-powered - No note-taking needed
      </span>

      <h2 className="text-4xl font-serif leading-tight mb-6">
        Your meetings,
        <br />
        <span className="italic text-blue-200">
          finally remembered.
        </span>
      </h2>

      <p className="text-sm text-blue-100 max-w-md mb-8">
        Record any conversation. Memo transcribes it, extracts key
        decisions, and turns action items into tasks automatically.
      </p>

      <FeaturePills />

      <MeetingCard />

      <p className="text-xs text-blue-200 mt-6">
        Trusted by 12,000+ teams worldwide
      </p>

    </div> 
  )
}

export default HeroSection