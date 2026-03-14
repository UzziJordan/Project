import React from 'react'
import { Link } from 'react-router-dom';



const LoginForm = () => {
  return (
<div className="bg-white shadow-sm rounded-xl p-10 w-105">

      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button className="flex-1 bg-white rounded-md py-2 text-sm font-medium">
          Sign In
        </button>

        <Link to="/SignupPage">
          <button className="flex-1 py-2 text-sm text-gray-500">
            Create Account
          </button>
        </Link>
      </div>

      <h2 className="text-2xl font-serif mb-1">
        Welcome <span className="text-blue-600 italic">back.</span>
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Sign in to your Memo account to continue.
      </p>

      {/* Google login */}

      <button className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 mb-6">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5"
        />
        Continue with Google
      </button>

      <div className="text-center text-sm text-gray-400 mb-6">
        or continue with email
      </div>

      {/* Email */}

      <input
        type="email"
        placeholder="malhub@company.com"
        className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password */}

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-between text-sm mb-6">

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <a href="#" className="text-blue-600">
          Forgot password?
        </a>

      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link to="/SignupPage">
          <span className="text-blue-600 cursor-pointer">
           Create one free
         </span>
        </Link>
      </p>

    </div>
  )
}

export default LoginForm