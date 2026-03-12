import React from 'react'
import Navbar from '../Landingpage/Navbar';
import Section1 from '../Landingpage/Section1';
import Section2 from '../Landingpage/Section2';

const LandingPage = () => {
  return (
    <div className='mt-4.25 md:mt-6.75 lg:mt-10'>
        <Navbar />
        <Section1 />
        <Section2 />
    </div>
  )
}

export default LandingPage