import React from 'react'
import HeroSection from "../Components/LoginPage/Hero/HeroSection";
import LoginForm from "../Components/LoginPage/LoginForm";


const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      <HeroSection />

      <div className="lg:w-1/2 w-full bg-gray-100 flex items-center justify-center">
        <LoginForm />
      </div>

    </div>
  )
}

export default LoginPage