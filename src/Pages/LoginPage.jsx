import React from 'react'
import HeroSection from "../Components/LoginPage/Hero/HeroSection";
import LoginForm from "../Components/LoginPage/LoginForm";


const LoginPage = () => {
  return (
    <div className="min-h-screen lg:h-256 flex flex-col lg:flex-row">

      <HeroSection />

      <div className="lg:w-1/2 w-[90vw] md:w-full flex items-start md:items-center lg:items-start justify-center">
        <LoginForm />
      </div>

    </div>
  )
}

export default LoginPage