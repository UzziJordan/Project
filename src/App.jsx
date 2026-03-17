import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './Pages/LandingPage';
import Omboarding from './Pages/Omboarding';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ForgotPassword from './Pages/ForgotPassword';

import DashboardLayout from './Pages/dashboard/DashboardLayout'
import Home  from './Pages/dashboard/Home';
import Library from './Pages/dashboard/Library';
import Settings from './Pages/dashboard/Settings';




const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Omboarding" element={<Omboarding />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="SignupPage" element={<SignupPage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />

        </Route>
      </Routes>  
    
    </BrowserRouter>
  )
}

export default App