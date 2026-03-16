import React from 'react'
import StatsCards from "../../Components/Dashboard/StatsCards";
import RecordBanner from "../../Components/Dashboard/RecordBanner";
import RecordList from "../../Components/Dashboard/RecordList";
import Searchbar from '../../Components/Dashboard/Searchbar';


const Home = () => {
  return (
    <div className="flex flex-col">

        <div className=" ">

            <Searchbar />

            <StatsCards />

            <RecordBanner />

            <RecordList />

        </div>


    </div>  )
}

export default Home