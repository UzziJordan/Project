import React from 'react'

import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../../Components/Dashboard/Sidebar"


const DashboardLayout = () => {

  return(

    <div className="flex h-screen">

        <Sidebar/>


        <div className="">
            <Outlet/>
        </div>

    </div>

  )
}

export default DashboardLayout