import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiSliders } from "react-icons/fi";
import Searchbar from '../../Components/Dashboard/Searchbar';
import RecordHistory from '../../Components/Dashboard/RecordHistory';
import FilterModal from "../../Components/Dashboard/FilterModal";

/**
 * Library Component
 * Purpose: Provides a comprehensive view of all recordings with search and filtering capabilities.
 */
const Library = () => {
    // --- STATE AND HOOKS ---
    const [localSearch, setLocalSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({ tags: [], folders: [] });

    // --- RENDER ---
    return (
        <div className='text-geist pt-20'>
            {/* GLOBAL SEARCH */}
            <Searchbar />

            {/* HEADER SECTION */}
            <div className='text-black flex justify-between font-bold text-[20px] px-6 py-5'>
                <p>Recordings Library</p>

                <Link to="/dashboard/recording">
                    <div className='bg-[#2828FA] text-white text-[14px] font-semibold gap-2 flex py-3 px-5 rounded-full'>
                        <span className='h-3 w-3 rounded-full bg-white'></span>
                        <p>New Recording</p>
                    </div>
                </Link>
            </div>

            {/* LOCAL SEARCH AND FILTER BAR */}
            <div className="w-full px-6">
                <div className="flex items-center justify-between bg-gray-100 border border-indigo-300 rounded-full px-4 py-3">
                    <div className="flex items-center gap-3 w-full">
                        <FiSearch className="text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Search by keyword across transcripts and summaries."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            className="bg-transparent outline-none w-full text-indigo-500 placeholder-indigo-400"
                        />
                    </div>

                    <FiSliders
                        onClick={() => setShowFilter(true)}
                        className="text-gray-500 text-lg cursor-pointer"
                    />
                </div>
            </div>

            {/* VIEW OPTIONS */}
            <div className='flex text-[#4B5563] mt-2 justify-end px-6'>
                View All →
            </div>

            {/* RECORDINGS HISTORY LIST */}
            <RecordHistory
                searchTerm={localSearch}
                filters={filters}
            />

            {/* FILTER MODAL */}
            <FilterModal
                isOpen={showFilter}
                onClose={() => setShowFilter(false)}
                onApply={(data) => setFilters(data)}
            />
        </div>
    );
};

export default Library;
