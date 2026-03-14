import React from 'react'
import HeroSection from "../Components/LoginPage/Hero/HeroSection";
import ForgotPasswordForm from "../Components/LoginPage/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      <HeroSection />

      <div className="lg:w-1/2 w-full bg-gray-100 flex items-center justify-center">
        <ForgotPasswordForm />
      </div>

    </div>  )
}

export default ForgotPassword