import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { account } from '../../lib/appwrite';

/**
 * LoginForm Component
 * Purpose: Provides a user interface for authenticating existing users.
 */
const LoginForm = () => {
    const navigate = useNavigate();

    // --- STATE AND HOOKS ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- HANDLERS ---
    
    // Handle form submission and authentication
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            // Authentication logic
            console.log("Login Data:", { email, password });

            const result = await account.createEmailPasswordSession({
                email: email,
                password: password
            });

            console.log(result);
            navigate("/dashboard");

            // Example redirect
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);

        } catch (error) {
            console.error(error);
            alert("Login failed");
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER ---
    return (
        <div className="bg-[#FFFFFF] mt-15 pl-10 md:pl-0 py-10 w-105 text-geist">
            {/* TOGGLE SECTION: Switch between Sign In and Create Account */}
            <div className="flex bg-[#F3F4F6] rounded-lg p-1 h-10 text-[10px] md:text-[14px] font-semibold">
                <button className="bg-white rounded-md px-15 md:px-18 py-1">
                    Sign In
                </button>
                <Link to="/SignupPage">
                    <button className="pl-12 md:pl-18 py-1.5 text-[#9CA3AF]">
                        Create Account
                    </button>
                </Link>
            </div>

            {/* HEADING SECTION */}
            <h2 className="text-[20px] text-instrument-serif mt-15 mb-1">
                Welcome <br />
                <span className="text-[#2828FA] italic">back.</span>
            </h2>

            <p className="text-[#9CA3AF] text-[14px]">
                Sign in to your Memo account to continue.
            </p>

            {/* LOGIN FORM SECTION */}
            <form onSubmit={handleSubmit}>
                {/* Google OAuth Button */}
                <button
                    type="button"
                    className="w-full border-[#E5E7EB] mt-7 border text-[13px] text-[#374151] rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 mb-6"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" alt="Google" />
                    Google
                </button>

                {/* Form Divider */}
                <div className='flex justify-between items-center text-center'>
                    <div className='h-0.5 w-30 bg-[#E5E7EB]'></div>
                    <div className="text-[12px] text-[#D1D5DB]">
                        or continue with email
                    </div>
                    <div className='h-0.5 w-30 bg-[#E5E7EB]'></div>
                </div>

                {/* Email Input */}
                <p className="mt-6 font-semibold text-[13px] text-[#374151]">
                    Email address
                </p>

                <div className="relative w-full mt-2">
                    <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#60A5FA]" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mail@company.com"
                        className="w-full border border-[#D1D5DB] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Input */}
                <div className="flex justify-between items-center mt-5">
                    <p className="font-semibold text-[13px] text-[#374151]">
                        Password
                    </p>
                    <Link to="/ForgotPassword" className="text-[#2828FA] text-[13px]">
                        Forgot password?
                    </Link>
                </div>

                <div className="relative w-full mt-2">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1D5DB]" />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-[#D1D5DB] rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Toggle Password Visibility */}
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 mt-5">
                    <input type="checkbox" className="w-4 h-4 accent-[#3B82F6]" />
                    <p className="text-sm text-[#6B7280]">Remember Me</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-3 rounded-xl text-white font-semibold bg-[#2828FA] hover:opacity-90 transition"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>

            {/* SECURITY COMPLIANCE FOOTER */}
            <div className="flex justify-center gap-6 mt-5 text-xs text-[#D1D5DB]">
                <div className="flex items-center gap-1">🛡️ <span>SSL Encrypted</span></div>
                <div className="flex items-center gap-1">🔒 <span>SOC 2 Compliant</span></div>
                <div className="flex items-center gap-1">🛡️ <span>GDPR Ready</span></div>
            </div>

            {/* NAVIGATION TO SIGNUP */}
            <p className="text-center text-[14px] text-[#9CA3AF] mt-6">
                Don't have an account?{" "}
                <Link to="/SignupPage">
                    <span className="text-[#2828FA] font-semibold cursor-pointer">
                        Create one free →
                    </span>
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
