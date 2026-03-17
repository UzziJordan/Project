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
import ToDoList from './Pages/dashboard/ToDoList';

import TranscriptPage from './Pages/dashboard/TranscriptPage';
import TranscriptTab from './Pages/dashboard/TranscriptTab';
import SummaryTab from './Pages/dashboard/SummaryTab';




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
          <Route path="todo" element={<ToDoList />} />

          <Route path="/dashboard/transcript" element={<TranscriptPage />}>
              <Route index element={<TranscriptTab />} />
              <Route path="summary" element={<SummaryTab />} />          </Route>
        </Route>
      </Routes>  
    
    </BrowserRouter>
  )
}

export default App