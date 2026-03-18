import React from 'react'

import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../../Components/Dashboard/Sidebar"


const DashboardLayout = () => {

  return(

      <div className="flex h-screen text-geist">

          <Sidebar/>


          <div className="bg-[#EFF2F9] h-screen w-[85vw] overflow-x-hidden">
              <Outlet/>
          </div>

      </div>

  )
}

export default DashboardLayout