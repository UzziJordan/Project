import React from 'react'
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className='bg-[#EFF2F9] pt-4.25 md:pt-6.75 lg:pt-10'>
        <div className='bg-[#F4F6F8] flex items-center justify-between px-2 w-[90vw] h-15 mx-auto md:px-2 lg:px-2'>
            <NavLink to="/">
              <h1 className='text-audiowide text-[#2828FA] text-2xl'>MEMO AI</h1>
            </NavLink>

            <NavLink to="/Login">
            <button className='w-33 h-10.5 bg-[#2828FA] align-middle rounded-xl text-[#FFFFFF] text-[12px] text-geist font-bold'>
                Join The Waitlist
            </button>
            </NavLink>
        </div>
    </nav>
  )
}

export default Navbar