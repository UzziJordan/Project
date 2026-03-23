import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navbar Component
 * Purpose: Provides the main navigation bar for the landing page.
 */
const Navbar = () => {
    // --- RENDER ---
    return (
        <nav className='bg-[#EFF2F9] pt-4.25 md:pt-6.75 lg:pt-10'>
            {/* NAVBAR CONTAINER */}
            <div className='bg-[#F4F6F8] flex items-center justify-between px-2 w-[90vw] h-15 mx-auto md:px-2 lg:px-2'>
                {/* LOGO */}
                <NavLink to="/">
                    <h1 className='text-audiowide text-[#2828FA] text-2xl'>MEMO AI</h1>
                </NavLink>
                
                {/* CTA BUTTON */}
                <NavLink to="/Onboarding">
                    <button className='w-33 h-10.5 bg-[#2828FA] align-middle rounded-xl text-[#FFFFFF] text-[12px] text-geist font-bold'>
                        Get Started
                    </button>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
