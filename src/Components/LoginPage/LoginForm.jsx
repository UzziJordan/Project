import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaEye } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className="bg-[#FFFFFF] mt-15 pl-10 md:pl-0 py-10 w-105 text-geist">
      
      {/* Toggle Button */}
      
      <div className="flex bg-[#F3F4F6] rounded-lg p-1 h-10 text-[10px] md:text-[14px] font-semibold">
        <button className=" bg-[#FFFFFF] rounded-md px-15 md:px-18 py-1"> Sign In </button>
        <Link to="/SignupPage">
          <button className="pl-12 md:pl-18 py-1.5 text-[#9CA3AF]"> Create Account </button>
        </Link>
      </div>
      
      {/* Heading */}
      
      <h2 className="text-[20px] text-instrument-serif mt-15 mb-1 ">
        Welcome <br />
        <span className="text-[#2828FA] italic">back.</span>
      </h2>
      <p className="text-[#9CA3AF] text-[14px]"> Sign in to your Memo account to continue. </p>
      
      {/* Google login */}
      
      <button className="w-full border-[#E5E7EB] mt-7 border text-[13px] text-[#374151] rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 mb-6">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
        Google
      </button>
      
      {/* Divider */}
      
      <div className='flex justify-between items-center align-middle text-center'>
        <div className='h-0.5 w-30 bg-[#E5E7EB]'></div>
        <div className="text-center items-center text-[12px] text-[#D1D5DB]"> or continue with email </div>
        <div className='h-0.5 w-30 bg-[#E5E7EB]'></div>
      </div>
      
      {/* Email Input */}
      
      <p className="mt-6 font-semibold text-[13px] text-[#374151]">Email address</p>
      
      <div className="relative w-full mt-2">
        
        <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#60A5FA]" />
        
        <input
          type="email"
          placeholder="malhub@company.com"
          className="w-full border border-[#D1D5DB] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Password Input */}
      
      <div className="flex justify-between items-center mt-5">
        <p className="font-semibold text-[13px] text-[#374151]">Password</p>
        <Link to="/ForgotPassword" className="text-[#2828FA] text-[13px]"> Forgot password? </Link>
      </div>
      
      <div className="relative w-full mt-2">
      
        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1D5DB]" />
      
        <input
          type="password"
          placeholder="••••••••"
          className="w-full border border-[#D1D5DB] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      
        <FaEye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
      
      </div>
      
      {/* Remember Me */}
      
      <div className="flex items-center gap-2 mt-5">
        <input type="checkbox" className="w-4 h-4 accent-[#3B82F6]" />
        <p className="text-sm text-[#6B7280]">Remember Me</p>
      </div>
      
      {/* Sign In Button */}
      
      <button className="w-full mt-6 py-3 rounded-xl text-white font-semibold bg-[#2828FA] hover:opacity-90 transition">
        Sign in
      </button>
      
      {/* Security Badges */}
      
      <div className="flex justify-center gap-6 mt-5 text-xs text-[#D1D5DB]">
        <div className="flex items-center gap-1"> 🛡️ <span>SSL Encrypted</span> </div>
        <div className="flex items-center gap-1"> 🔒 <span>SOC 2 Compliant</span> </div>
        <div className="flex items-center gap-1"> 🛡️ <span>GDPR Ready</span> </div>
      </div>
      
      {/* Sign Up Link */}
      
      <p className="text-center text-[14px] text-[#9CA3AF] mt-6">
        Don't have an account?{" "}
        <Link to="/SignupPage">
          <span className="text-[#2828FA] font-semibold cursor-pointer"> Create one free → </span>
        </Link>
      </p>
    
    </div>
  );
};

export default LoginForm;
