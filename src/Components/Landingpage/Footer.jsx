import React from 'react';
import insta from '../../Images/insta.svg';
import twitter from '../../Images/twitter.svg';
import tiktok from '../../Images/tiktok.svg';
import facebook from '../../Images/facebook.svg';

const Footer = () => {
  return (
    <div className='text-geist pb-10'>
      {/* Main Container */}
      <div className='flex-col px-5 lg:px-25'>
        {/* Top Section */}
        <div className='flex flex-col items-center pt-8 lg:items-start lg:flex-row justify-center gap-15 lg:gap-100 lg:pt-20'>
          {/* Brand Info */}
          <div className='text-[#000000]'>
            <h1 className='text-audiowide text-4xl'>MEMO AI</h1>
            <p className='font-medium text-[12px]'>Your meetings, summarized</p>
            {/* Social Links */}
            <div className='flex gap-8 mt-4'>
              <img src={insta} alt="Instagram" />
              <img src={twitter} alt="Twitter" />
              <img src={tiktok} alt="TikTok" />
              <img src={facebook} alt="Facebook" />
            </div>
          </div>
          {/* Links Container */}
          <div className='flex gap-10 md:gap-20 lg:gap-25 text-[16px] text-[#2B2B2B] mt-5 lg:mt-0'>
            {/* Product Links */}
            <div className='flex flex-col gap-2'>
              <h1 className='pb-2 font-bold text-[#000000]'>Product</h1>
              <p>Features</p>
              <p>Roadmap</p>
              <p>Changelog</p>
              <p>Download</p>
            </div>
            {/* Company Links */}
            <div className='flex flex-col gap-2'>
              <h1 className='pb-2 font-bold text-[#000000]'>Company</h1>
              <p>About</p>
              <p>Blog</p>
              <p>Careers</p>
              <p>Contact</p>
            </div>
            {/* Legal Links */}
            <div className='flex flex-col gap-2'>
              <h1 className='pb-2 font-bold text-[#000000]'>Legal</h1>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Cookie Policy</p>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className='h-0.5 mt-30 w-full bg-[#D9D9D9]'></div>
        {/* Copyright Info */}
        <div>
          <p className='font-medium text-[#2B2B2B] text-[17px] mt-3'>© 2026 Memo AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;