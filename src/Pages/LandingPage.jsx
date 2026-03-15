import React from 'react'
import Navbar from '../Components/Landingpage/Navbar';
import Section1 from '../Components/Landingpage/Section1';
import Section2 from '../Components/Landingpage/Section2';
import Section3 from '../Components/Landingpage/Section3';
import Section4 from '../Components/Landingpage/Section4';
import Section5 from '../Components/Landingpage/Section5';
import Section6 from '../Components/Landingpage/Section6';
import Section7 from '../Components/Landingpage/Section7';
import Footer from '../Components/Landingpage/Footer';
const LandingPage = () => {
  return (
    <div className='overflow-x-hidden'>
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