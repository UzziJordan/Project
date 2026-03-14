import React from 'react'
import line1 from '../Images/line1.svg'
import line2 from '../Images/line2.svg'
import step1 from '../Images/step1.svg'
import step2 from '../Images/step2.svg'
import step3 from '../Images/step3.svg'

const Section2 = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
        <div className='h-8 w-31 bg-[#2828FA]/10 mt-6 '>
          <p className=' text-[#2828FA]'>HOW IT WORKS</p>
        </div>
        <div className='w-133.25'>
          <p>Everything you need from a meeting. Nothing you don't.</p>
          <p>Built for professionals who are tired of drowning in recordings and scribbled notes.</p>
        </div>

        <div className='flex mb-60'>
          <div className='w-51.75 h-27'>
            <div>
              <div className='h-6.25 w-18.5 bg-[#2828FA]/10'>
                <p>STEP - 01</p>
              </div>

              <div className='h-17'>
                <p>Record</p>
                <p>Tap record during meetings, lectures, or interviews.</p>
              </div>
            </div>

            <div>
              <img src={line1} alt="line" />
            </div>
            <div>
              <img src={step1} alt="img" />
            </div>
          </div>

          <div className='w-51.75 h-27'>
            <div>
              <img src={line2} alt="line" />
            </div>

            <div>
              <div className='h-17'>
                <p>Transcribe</p>
                <p>Memo AI converts speech into accurate searchable text.</p>
              </div>
              <div className='h-6.25 w-18.5 bg-[#2828FA]/10'>
                <p>STEP - 02</p>
              </div>
            </div>

            <div>
              <img src={step2} alt="img" />
            </div>
          </div>

          <div className='w-51.75 h-27'>
            <div>
              <div className='h-6.25 w-18.5 bg-[#2828FA]/10'>
                <p>STEP - 03</p>
              </div>

              <div className='h-17'>
                <p>Summarize</p>
                <p>Get smart summaries, keypoints and action items in seconds.</p>
              </div>
            </div>

            <div>
              <img src={line3} alt="line" />
            </div>
            <div>
              <img src={step3} alt="img" />
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Section2