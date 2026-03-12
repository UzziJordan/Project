import React from 'react'
import Card4 from '../Images/Card4.svg'
import universe from '../Images/universe.svg'
import reliable from '../Images/reliable.svg'

const Section6 = () => {
  return (
    <div>
        <div className='flex'>        
            <div>

                <div>
                    <h1>Works Everywhere You Speak</h1>
                    <p>Meetings, lectures, interviews, brainstorms. Memo handles any audio scenario. Works offline, in noisy rooms, and across multiple speakers with speaker detection.</p>
                </div>

                <div className='flex justify-between'>
                    <div className='bg-[#2828FA] w-40 h-12 flex items-center justify-center'>
                        <p> <img src={universe} alt="" /> <span>Universal</span></p>
                    </div>
                    <div className='bg-[#EFF2F9] w-40 h-12 flex items-center justify-center'>
                        <p> <img src={reliable} alt="" /> <span>Reliable</span></p>
                    </div>

                </div>


            </div>

            <div className=' '>
                <img className='' src={Card4} alt="img" />
            </div>


        </div>
    </div>
  )
}

export default Section6