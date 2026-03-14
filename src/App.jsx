import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './Pages/LandingPage';
import Waitlist from './Pages/Waitlist';


const App = () => {
  return (
  <BrowserRouter>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Waitlist" element={<Waitlist />} />
      </Routes>
      
  </BrowserRouter>
  )
}

export default App