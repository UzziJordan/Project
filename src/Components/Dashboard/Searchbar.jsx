// ================= IMPORTS =================
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { FiSearch, FiUpload, FiBell, FiMic, FiClock, FiMenu } from "react-icons/fi";


// ================= COMPONENT =================
/**
 * Searchbar Component
 * Purpose: Provides global search functionality with a dropdown for quick results
 */
const Searchbar = () => {

    // ================= STATE =================
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    
    // Sidebar toggle state from DashboardLayout context
    const [isSidebarOpen, setIsSidebarOpen] = useOutletContext() || [false, () => {}];

    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    
    // ================= ROUTE MAPPING =================
    const routeNames = {
        "/dashboard": "Home",
        "/dashboard/library": "Library",
        "/dashboard/transcript": "Transcript",
        "/dashboard/todo": "To-Do List",
        "/dashboard/settings": "Settings",
        "/dashboard/transcript/summary": "Summary",
    };

    const currentPage = routeNames[location.pathname] || "Home";


    // ================= EFFECTS =================

    // Filter recordings based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        const recordings = JSON.parse(localStorage.getItem('recordings')) || [];

        const filtered = recordings.filter((rec) =>
            rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (rec.transcript && rec.transcript.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        setResults(filtered.slice(0, 5)); // Limit results to 5
    }, [searchTerm]);


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // ================= HANDLERS =================

    const handleSelectResult = (rec) => {
        localStorage.setItem('latestRecording', JSON.stringify(rec));
        setSearchTerm('');
        setShowResults(false);
        navigate('/dashboard/transcript');
    };


    // ================= UI =================
    return (
        <div className='fixed top-0 left-0 md:left-auto w-full md:w-[85vw] h-18 bg-white border-b border-[#CCCCCC] z-30'>

            {/* ================= INNER CONTAINER ================= */}
            <div className='flex items-center justify-between px-4 md:px-10 h-full'>


                {/* ================= LEFT SIDE ================= */}
                <div className='flex items-center gap-3 md:gap-6 flex-1'>
                    
                    {/* MOBILE MENU TOGGLE */}
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <FiMenu size={24} />
                    </button>

                    {/* PAGE TITLE */}
                    <div className='text-[16px] hidden sm:block md:w-28 font-semibold text-[#111827]'>
                        {currentPage}
                    </div>


                    {/* SEARCH INPUT */}
                    <div className="w-full max-w-md relative" ref={searchRef}>

                        <div className="flex items-center bg-[#F9FAFB] border h-9 border-[#E5E7EB] gap-2 md:gap-3 px-3 md:px-5 rounded-full focus-within:border-blue-400 transition">
                            <FiSearch className="text-[#374957] text-lg md:text-xl" />

                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowResults(true);
                                }}
                                onFocus={() => setShowResults(true)}
                                className="bg-transparent text-[13px] w-full text-[#111827] placeholder-[#9CA3AF] outline-none"
                            />
                        </div>


                        {/* ================= SEARCH DROPDOWN ================= */}
                        {showResults && searchTerm && (
                            <div className="absolute top-11 left-0 w-full bg-white border rounded-xl shadow-xl overflow-hidden z-60 animate-in fade-in slide-in-from-top-2 duration-200">

                                {results.length > 0 ? (

                                    <div className="py-2">

                                        {/* DROPDOWN HEADER */}
                                        <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Found Recordings
                                        </div>

                                        {/* RESULT ITEMS */}
                                        {results.map((rec) => (
                                            <div
                                                key={rec.id}
                                                onClick={() => handleSelectResult(rec)}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition"
                                            >

                                                {/* LEFT CONTENT */}
                                                <div className="flex items-center gap-3">

                                                    {/* ICON */}
                                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition">
                                                        <FiMic />
                                                    </div>

                                                    {/* TEXT */}
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-gray-800 truncate max-w-37.5 md:max-w-50">
                                                            {rec.title}
                                                        </p>

                                                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                                            <FiClock className="text-[9px]" /> {rec.date}
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* ACTION */}
                                                <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition">
                                                    View →
                                                </span>

                                            </div>
                                        ))}
                                    </div>

                                ) : (

                                    // NO RESULTS
                                    <div className="p-6 text-center text-gray-400 text-sm">
                                        No results found for "{searchTerm}"
                                    </div>

                                )}
                            </div>
                        )}
                    </div>

                </div>


                {/* ================= RIGHT SIDE ================= */}
                <div className="flex gap-1 md:gap-2 ml-2">

                    {/* UPLOAD BUTTON */}
                    <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center border-2 border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-gray-100 transition">
                        <FiUpload size={18} />
                    </button>

                    {/* NOTIFICATION BUTTON */}
                    <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center border-2 border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-gray-100 transition">
                        <FiBell size={18} />
                    </button>

                </div>

            </div>
        </div>
    );
};


// ================= EXPORT =================
export default Searchbar;