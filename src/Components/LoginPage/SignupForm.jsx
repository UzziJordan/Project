import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ID } from 'appwrite';
import { account } from '../../lib/appwrite';

/**
 * SignupForm Component
 * Purpose: Provides a user interface for creating a new Memo account.
 */
const SignupForm = () => {
    const navigate = useNavigate();

    // --- STATE AND HOOKS ---
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- HANDLERS ---
    
    // Handle form submission and account creation
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        if (!agree) {
            alert("You must agree to the terms");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        try {
            setLoading(true);

            const user = await account.create({
                userId: ID.unique(),
                name: `${firstName} ${lastName}`,
                email: email,
                password: password
            });
            console.log(user);

            // Redirect to login after successful signup
            navigate("/login");

        } catch (err) {
            console.error(err);
            alert("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER ---
    return (
        <div className="bg-white mt-15 pl-10 md:pl-0 py-10 w-105 text-geist">
            {/* TOGGLE SECTION: Switch between Sign In and Create Account */}
            <div className="flex bg-[#F3F4F6] rounded-lg p-1 h-10 text-[10px] md:text-[14px] font-semibold">
                <Link to="/Login">
                    <button className="px-15 md:px-19 py-1 text-[#9CA3AF]">
                        Sign in
                    </button>
                </Link>
                <button className="bg-white rounded-md w-1/2 py-1">
                    Create Account
                </button>
            </div>

            {/* TITLE SECTION */}
            <h2 className="text-[20px] text-instrument-serif mt-15 mb-1">
                Start for <br />
                <span className="text-[#2828FA] italic">free today.</span>
            </h2>

            <p className="text-[#9CA3AF] text-[14px]">Sign up to continue.</p>

            {/* SIGNUP FORM SECTION */}
            <form onSubmit={handleSubmit}>
                {/* Google OAuth Button */}
                <button
                    type="button"
                    className="w-full border mt-7 text-[13px] text-[#374151] rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 mb-6"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" alt="Google" />
                    Google
                </button>

                {/* Form Divider */}
                <div className='flex justify-between items-center text-center'>
                    <div className='h-0.5 w-30 bg-[#E5E7EB]'></div>
                    <div className="text-[12px] text-[#D1D5DB]">or with email</div>
                    <div className='h-0.5 w-30 bg-[#E5E7EB]'></div>
                </div>

                {/* Name Inputs */}
                <div className='flex mt-6 gap-4'>
                    <div className='w-full'>
                        <p className="font-semibold text-[13px] text-[#374151]">First Name</p>
                        <div className="relative mt-2">
                            <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#60A5FA]" />
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Philip"
                                className="w-full border border-[#D1D5DB] rounded-lg pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className="font-semibold text-[13px] text-[#374151]">Last Name</p>
                        <div className="relative mt-2">
                            <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#60A5FA]" />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Joy"
                                className="w-full border border-[#D1D5DB] rounded-lg pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Email Input */}
                <p className="mt-6 font-semibold text-[13px] text-[#374151]">Work Email</p>
                <div className="relative w-full mt-2">
                    <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#60A5FA]" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mail@gmail.com"
                        className="w-full border border-[#D1D5DB] rounded-xl pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Input */}
                <p className="mt-6 font-semibold text-[13px] text-[#374151]">Create Password</p>
                <div className="relative w-full mt-2">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D1D5DB]" />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
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

                {/* Terms and Privacy Agreement */}
                <label className="flex gap-2 text-[13px] mt-5 text-[#6B7280] mb-6">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                    />
                    <span>
                        I agree to Memo's{" "}
                        <span className="text-[#2828FA] underline cursor-pointer">
                            Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-[#2828FA] underline cursor-pointer">
                            Privacy Policy
                        </span>.
                    </span>
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-white font-semibold bg-[#2828FA] hover:opacity-90 transition"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>
            </form>

            {/* NAVIGATION TO LOGIN */}
            <Link to="/Login">
                <p className="text-center text-[14px] text-[#9CA3AF] mt-6">
                    Already have an account?{" "}
                    <span className="text-[#3B82F6] cursor-pointer">
                        Sign in →
                    </span>
                </p>
            </Link>
        </div>
    );
};

export default SignupForm;
