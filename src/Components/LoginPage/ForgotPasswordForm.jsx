import React from 'react'
import { Link } from "react-router-dom";


const ForgotPasswordForm = () => {
  return (
<div className="bg-white shadow-sm rounded-xl p-10 w-105">

      {/* Back Button */}

        <Link to="/Login"
        className="text-blue-600 text-sm mb-6 inline-block"
        >
            ← Back to Sign In
        </Link>

      {/* Icon */}

      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
        <span className="text-blue-600 text-xl">✉</span>
      </div>

      {/* Title */}

      <h2 className="text-2xl font-serif mb-2">
        Reset your <span className="text-blue-600 italic">password.</span>
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Enter your email and we'll send a reset link within 2 minutes.
      </p>

      {/* Email Input */}

      <input
        type="email"
        placeholder="you@company.com"
        className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button */}

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
        Reset Password
      </button>

    </div>
  )
}

export default ForgotPasswordForm