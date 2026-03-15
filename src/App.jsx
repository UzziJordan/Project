import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ForgotPassword from './Pages/ForgotPassword';



const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="SignupPage" element={<SignupPage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>  
    
    </BrowserRouter>
  )
}

export default App