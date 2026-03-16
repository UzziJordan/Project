import React from 'react'
import StatsCards from "../../Components/Dashboard/StatsCards";
import RecordBanner from "../../Components/Dashboard/RecordBanner";
import RecordList from "../../Components/Dashboard/RecordList";
import Searchbar from '../../Components/Dashboard/Searchbar';


const Home = () => {
  return (
    <div className="flex flex-col ">
        <Searchbar />

        <div className="py-2 px-17">
            
            <StatsCards />

            <RecordBanner />

            <RecordList />

            <p className='flex justify-center pt-20 text-gray-400 items-center'>
                No Recording History 
            </p>

        </div>


    </div>  )
}

export default Home