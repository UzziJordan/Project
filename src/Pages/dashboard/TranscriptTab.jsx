import React, { useEffect, useState, useRef } from 'react';
import { FiSearch, FiEdit, FiShare2, FiCalendar, FiClock } from "react-icons/fi";
import wavve from '../../Images/wavve.svg';
import playi from '../../Images/playi.svg';
import { databases } from '../../lib/appwrite';
import { DATABASE_ID, RECORDINGS_COLLECTION_ID } from '../../lib/databaseConfig';

/**
 * TranscriptTab Component
 * Purpose: Displays the full transcript of a recording with playback controls, sharing, and renaming options.
 */
const TranscriptTab = () => {

    // --- STATE AND HOOKS ---
    const [recording, setRecording] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const audioRef = useRef(null);


    // --- SIDE EFFECTS ---
    useEffect(() => {
        const latest = localStorage.getItem('latestRecording');

        if (latest) {
            const parsedRecording = JSON.parse(latest);
            setRecording(parsedRecording);
            setNewTitle(parsedRecording.title);
        }
    }, []);


    // --- HELPERS ---
    const formatTime = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress =
        recording?.duration > 0
            ? (currentTime / recording.duration) * 100
            : 0;


    // --- HANDLERS ---
    const togglePlayback = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleRename = async () => {
        if (!recording || !newTitle.trim()) return;

        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                RECORDINGS_COLLECTION_ID,
                recording.$id,
                { title: newTitle.trim() }
            );

            setRecording(response);
            localStorage.setItem('latestRecording', JSON.stringify(response));
            setShowRenameModal(false);
        } catch (error) {
            console.error("Error renaming recording:", error);
            alert("Failed to rename recording in Appwrite.");
        }
    };


    // --- RENDER HELPERS ---
    if (!recording) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>No recording selected.</p>
                <p className="text-sm">
                    Go to the recording page to start a new session.
                </p>
            </div>
        );
    }


    // --- MAIN RENDER ---
    return (
        <div className="mx-0 md:mx-0 gap-6 pb-10">

            {/* HIDDEN AUDIO ELEMENT */}
            <audio
                ref={audioRef}
                src={recording.audioURL}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />


            {/* HEADER BAR SECTION */}
            <div className="w-full p-4 md:p-3 rounded-2xl border border-[#EBEBEB] flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-sm gap-4 md:gap-0">

                {/* INFORMATION */}
                <div>
                    <h1 className="text-base md:text-lg font-semibold text-gray-800">
                        {recording.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                            <FiCalendar className="text-sm md:text-base" />
                            <span>{recording.date}</span>
                        </div>

                        <span className="hidden md:inline">•</span>

                        <div className="flex items-center gap-1">
                            <FiClock className="text-sm md:text-base" />
                            <span>{formatTime(recording.duration)}</span>
                        </div>

                        <span className="hidden md:inline">•</span>

                        <span>1 Speaker (You)</span>
                    </div>
                </div>


                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">

                    <button
                        onClick={() => setShowRenameModal(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FiEdit />
                        Edit
                    </button>

                    <button
                        onClick={() => setShowShareModal(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm md:text-base hover:bg-blue-700 transition shadow-md"
                    >
                        <FiShare2 />
                        Share
                    </button>

                </div>
            </div>


            <div className='mt-6 flex flex-col lg:flex-row gap-6'>

                {/* LEFT PANEL */}
                <div className="bg-white rounded-xl p-5 md:p-6 border shadow-sm w-full lg:w-1/3 h-fit lg:sticky lg:top-4">

                    <div>
                        <p className="font-semibold text-gray-900">
                            {recording.title}
                        </p>

                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                            <span>{recording.date}</span>

                            <span>•</span>

                            <div className="flex items-center gap-1">
                                <FiClock className="text-base" />
                                <span>{formatTime(recording.duration)}</span>
                            </div>
                        </div>
                    </div>


                    {/* WAVEFORM */}
                    <div className='my-6 opacity-60'>
                        <img src={wavve} alt="Waveform" className="w-full" />
                    </div>


                    {/* PLAYER */}
                    <div className='flex flex-col p-4 gap-3 rounded-2xl border-2 border-gray-50 bg-gray-50/50'>

                        <div className='flex justify-between items-center'>

                            <div
                                onClick={togglePlayback}
                                className="cursor-pointer hover:scale-110 transition bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                            >
                                {isPlaying ? (
                                    <span className="text-white text-[10px] font-bold">
                                        PAUSE
                                    </span>
                                ) : (
                                    <img
                                        src={playi}
                                        alt="Play"
                                        className="w-4 h-4 invert"
                                    />
                                )}
                            </div>

                            <div className='flex flex-col items-end'>
                                <p className="text-[10px] md:text-xs text-gray-500 font-mono">
                                    {formatTime(currentTime)} / {formatTime(recording.duration)}
                                </p>
                            </div>

                            <div className="text-xs font-bold text-gray-400">
                                1x
                            </div>
                        </div>

                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-1.5 bg-blue-600 transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                    </div>


                    {/* SPEAKER */}
                    <div className="mt-6 md:mt-8">
                        <p className="font-semibold text-gray-900 mb-4">
                            Speakers
                        </p>

                        <div className='flex justify-between items-center'>

                            <div className='flex items-center gap-3'>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                                    YOU
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    Me
                                </span>
                            </div>

                            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">
                                Host
                            </span>

                        </div>
                    </div>

                </div>


                {/* RIGHT PANEL */}
                <div className="bg-white rounded-xl p-5 md:p-6 border shadow-sm flex-1 min-h-[300px] md:min-h-125">

                    {/* TRANSCRIPT HEADER */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 border-b pb-4 gap-4 sm:gap-0">

                        <div className="font-bold text-xl text-gray-800">
                            Transcript
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full sm:w-auto">

                            <div className="flex flex-1 sm:flex-none items-center px-3 py-1.5 bg-gray-50 rounded-lg border">
                                <FiSearch className="text-gray-400 mr-2" />
                                <input
                                    placeholder="Search..."
                                    className="bg-transparent text-sm focus:outline-none w-full sm:w-32"
                                />
                            </div>

                            <button
                                onClick={() => navigator.clipboard.writeText(recording.transcript)}
                                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                            >
                                Copy all
                            </button>

                        </div>
                    </div>


                    {/* TRANSCRIPT TEXT */}
                    <div className="space-y-6 md:space-y-8 text-sm md:text-base leading-relaxed">

                        <div>
                            <p className="font-bold text-blue-600 mb-2">
                                Me
                            </p>

                            <p className="text-gray-700 whitespace-pre-wrap">
                                {recording.transcript || "No transcript available for this recording."}
                            </p>
                        </div>

                    </div>
                </div>
            </div>


            {/* SHARE MODAL */}
            {showShareModal && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setShowShareModal(false)}
                >
                    <div
                        className="bg-white w-full max-w-md rounded-2xl p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-1 text-gray-900">
                            Share & Export
                        </h2>

                        <p className="text-sm text-gray-500 mb-8">
                            {recording.title} • {formatTime(recording.duration)}
                        </p>

                        <div className="space-y-3">

                            <div
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = recording.audioURL;
                                    link.download = recording.title || 'recording';
                                    link.click();
                                }}
                                className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer group"
                            >
                                <div>
                                    <p className="font-bold text-gray-800 group-hover:text-blue-700">
                                        Download Audio
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Save recording file locally
                                    </p>
                                </div>
                                <span className="text-gray-400 group-hover:text-blue-500">
                                    ›
                                </span>
                            </div>

                            <div
                                onClick={() => {
                                    navigator.clipboard.writeText(recording.summary);
                                    alert("Summary copied to clipboard!");
                                }}
                                className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer group"
                            >
                                <div>
                                    <p className="font-bold text-gray-800 group-hover:text-blue-700">
                                        Copy Summary
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Copy AI-generated summary
                                    </p>
                                </div>
                                <span className="text-gray-400 group-hover:text-blue-500">
                                    ›
                                </span>
                            </div>

                            <div
                                onClick={() => {
                                    const content = `
                                        Title: ${recording.title}

                                        Summary:
                                        ${recording.summary || "No summary"}

                                        Transcript:
                                        ${recording.transcript || "No transcript"}
                                    `;
                                    const blob = new Blob([content], { type: "text/plain" });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.download = `${recording.title}-notes.txt`;
                                    link.click();
                                }}
                                className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer group"
                            >
                                <div>
                                    <p className="font-bold text-gray-800 group-hover:text-blue-700">
                                        Download Notes (TXT)
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Summary + transcript
                                    </p>
                                </div>
                                <span className="text-gray-400 group-hover:text-blue-500">
                                    ›
                                </span>
                            </div>

                            <div
                                onClick={() => {
                                    navigator.clipboard.writeText(recording.transcript);
                                    alert("Transcript copied to clipboard!");
                                }}
                                className="flex items-center justify-between p-4 border rounded-xl hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer group"
                            >
                                <div>
                                    <p className="font-bold text-gray-800 group-hover:text-blue-700">
                                        Copy Transcript
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Copy full transcript
                                    </p>
                                </div>
                                <span className="text-gray-400 group-hover:text-blue-500">
                                    ›
                                </span>
                            </div>

                        </div>


                        {/* INTERNAL LINK */}
                        <div className="mt-8">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Internal Blob URL
                            </p>

                            <div className="flex items-center gap-2">

                                <input
                                    type="text"
                                    readOnly
                                    value={recording.audioURL}
                                    className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg text-xs font-mono text-gray-500 outline-none"
                                />

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(recording.audioURL);
                                        alert("Link copied!");
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200"
                                >
                                    Copy
                                </button>

                            </div>

                            <p className="text-[10px] text-gray-400 mt-2 italic">
                                * Note: Blob URLs are session-specific and will expire on refresh.
                            </p>
                        </div>

                    </div>
                </div>
            )}


            {/* RENAME MODAL */}
            {showRenameModal && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setShowRenameModal(false)}
                >
                    <div
                        className="bg-white w-full max-w-md rounded-2xl p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowRenameModal(false)}
                            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900">
                            Rename Recording
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Enter a new title for "{recording.title}". This will update in your library.
                        </p>

                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="New recording title"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleRename();
                            }}
                        />

                        <div className="mt-8 flex justify-end gap-3">

                            <button
                                onClick={() => setShowRenameModal(false)}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleRename}
                                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md shadow-blue-200"
                            >
                                Rename
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TranscriptTab;