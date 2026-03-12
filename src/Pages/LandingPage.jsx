import React from 'react'
import Navbar from '../Landingpage/Navbar';
import Section1 from '../Landingpage/Section1';
import Section2 from '../Landingpage/Section2';
import Section3 from '../Landingpage/Section3';
import Section4 from '../Landingpage/Section4';
import Section5 from '../Landingpage/Section5';
import Section6 from '../Landingpage/Section6';
import Section7 from '../Landingpage/Section7';
import Footer from '../Landingpage/Footer';
const LandingPage = () => {
  return (
    <div className='mt-4.25 md:mt-6.75 lg:mt-10'>
        <Navbar />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Footer />
    </div>
  )
}

export default LandingPage