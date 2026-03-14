import React from 'react'
import { Link } from 'react-router-dom';


const SignupForm = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-10 w-105">

      {/* Toggle */}

      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <Link to="/Login">
            <button className="flex-1 py-2 text-sm text-gray-500">
                Sign in
            </button>
        </Link>

        <button className="flex-1 bg-white rounded-md py-2 text-sm font-medium">
          Create Account
        </button>

      </div>

      {/* Title */}

      <h2 className="text-2xl font-serif mb-1">
        Start for <span className="text-blue-600 italic">free today.</span>
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Sign up to continue.
      </p>

      {/* Google signup */}

      <button className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 mb-6">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5"
        />
        Sign up with Google
      </button>

      <div className="text-center text-sm text-gray-400 mb-6">
        or with email
      </div>

      {/* First + Last name */}

      <div className="flex gap-4 mb-4">

        <input
          type="text"
          placeholder="Philip"
          className="w-1/2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Joy"
          className="w-1/2 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Email */}

      <input
        type="email"
        placeholder="malhub@gmail.com"
        className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password */}

      <input
        type="password"
        placeholder="Min. 8 characters"
        className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Terms */}

      <label className="flex gap-2 text-sm text-gray-500 mb-6">

        <input type="checkbox" />

        <span>
          I agree to Memo's
          <span className="text-blue-600 cursor-pointer"> Terms of Service </span>
          and
          <span className="text-blue-600 cursor-pointer"> Privacy Policy</span>.
        </span>

      </label>

      {/* Button */}

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
        Create Account
      </button>

      {/* Bottom text */}


        <Link to="/Login">
            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?
                <span className="text-blue-600 cursor-pointer"> Sign in →</span>
            </p>
        </Link>

    </div>

  )
}

export default SignupForm