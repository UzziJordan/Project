import React from 'react';
import HeroSection from "../Components/LoginPage/Hero/HeroSection";
import SignupForm from "../Components/LoginPage/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen lg:h-256 flex flex-col lg:flex-row">
      {/* Hero Section */}
      <HeroSection />
      {/* Signup Form */}
      <div className="lg:w-1/2 w-[90vw] md:w-full flex items-start md:items-center lg:items-start justify-center">
        <SignupForm />
      </div>
    
    </div>
  );
};

export default SignupPage;
