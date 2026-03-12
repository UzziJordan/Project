import React from 'react'
import Phone from '../Images/Phone.svg'
import imagep1 from '../Images/imagep1.svg'
import imagep2 from '../Images/imagep2.svg'
import imagep3 from '../Images/imagep3.svg'

const Section1 = () => {
  return (
    <div className='bg-[#EFF2F9] pb-[48.28px]'>
        <div>
            <div>
                <p>•</p> <span>AI-powered meeting notes</span>
            </div>
            <p>Your meetings<span>summarized</span></p>
            <div>
                <p>Memo records your meetings, lectures, and interview then instantly delivers AI-generated transcripts, smart summaries, and action items. </p>
                <p>Stop relistening, Start doing.</p>
            </div>
            <div>
                <button className='bg-[#2828FA] text-[#FFFFFF] flex items-center gap-2 px-4 py-2 rounded-lg'>
                    <img className='' src={Phone} alt="Phone" /> <span>Join the Waitlist</span>
                </button>
            </div>
            <div>
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#60A5FA] to-[#3B82F6] flex items-center justify-center text-white font-semibold border-2 border-white">
                        A
                    </div>

                    <div className="-ml-3 w-12 h-12 rounded-full bg-linear-to-br from-[#34D399] to-[#10B981] flex items-center justify-center text-white font-semibold border-2 border-white">
                        M
                    </div>

                    <div className="-ml-3 w-12 h-12 rounded-full bg-linear-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white font-semibold border-2 border-white">
                        R
                    </div>

                    <div className="-ml-3 w-12 h-12 rounded-full bg-linear-to-br from-[#FB923C] to-[#EA580C] flex items-center justify-center text-white font-semibold border-2 border-white">
                        S
                    </div>
                </div>
                <p>Join 2,400+ early adopters on the waitlist</p>
            </div>
        </div>
                <div className="flex justify-center items-center">

            <img
                src={imagep1}
                alt="phone"
                className="w-56 -mb-25 -mr-20"
            />

            <img
                src={imagep2}
                alt="phone"
                className="w-64 z-10"
            />

            <img
                src={imagep3}
                alt="phone"
                className="w-56 -mb-25 -ml-20 z-20"
            />

        </div>    


    </div>
  )
}

export default Section1