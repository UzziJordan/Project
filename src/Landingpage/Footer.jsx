import React from 'react'
import insta from '../Images/insta.svg'
import twitter from '../Images/twitter.svg'
import tiktok from '../Images/tiktok.svg'
import faebook from '../Images/facebook.svg'

const Footer = () => {
  return (
    <div>
        <div className='flex-col'>
            <div className='flex flex-row justify-between'>
                <div>
                    <h1>MEMO AI</h1>
                    <p>Your meetings, summarized</p>
                    <div>
                        <img src={insta} alt="" />
                        <img src={twitter} alt="" />
                        <img src={tiktok} alt="" />
                        <img src={faebook} alt="" />
                    </div>
                </div>
                <div>
                    <div>
                        <h1>Product</h1>
                        <p>Features</p>
                        <p>Roadmap</p>
                        <p>Changelog</p>
                        <p>Download</p>
                    </div>
                    <div>
                        <h1>Company</h1>
                        <p>About</p>
                        <p>Blog</p>
                        <p>Careers</p>
                        <p>Contact</p>
                    </div>
                    <div>
                        <h1>Legal</h1>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                        <p>Cookie Policy</p>
                    </div>
                </div>
            </div>
            <div className='h-1 w-full bg-[#D9D9D9]'></div>
            <div>
                <p>© 2026 Memo AI. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer