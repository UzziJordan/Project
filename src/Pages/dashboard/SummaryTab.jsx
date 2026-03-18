import React, { useEffect, useState } from 'react';

/**
 * Summary Component
 * Purpose: Displays an AI-generated summary and key takeaways from the latest recording.
 */
const Summary = () => {
    // --- STATE AND HOOKS ---
    const [recording, setRecording] = useState(null);

    // --- SIDE EFFECTS ---
    useEffect(() => {
        const latest = localStorage.getItem('latestRecording');
        if (latest) {
            setRecording(JSON.parse(latest));
        }
    }, []);

    // --- HELPERS ---
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} min ${secs} sec`;
    };

    // Split summary text into individual points
    const summaryPoints = recording?.summary
        ? recording.summary.split(/[.!?]/).filter(s => s.trim().length > 5)
        : ["No summary available."];

    // --- RENDER HELPERS ---
    if (!recording) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>No summary available.</p>
                <p className="text-sm">Go to the recording page to start a new session.</p>
            </div>
        );
    }

    // --- MAIN RENDER ---
    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            {/* HEADER SECTION */}
            <div className="bg-blue-50 p-6 rounded-2xl flex justify-between items-center border border-blue-100 shadow-sm">
                <div>
                    <h2 className="font-bold text-2xl text-blue-900">
                        {recording.title}
                    </h2>
                    <p className="text-sm text-blue-600 font-medium mt-1">
                        {recording.date} · {formatTime(recording.duration)} · 1 Speaker
                    </p>
                </div>

                <span className="text-xs bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold shadow-sm flex items-center gap-1">
                    <span className="animate-pulse">✦</span> AI Generated
                </span>
            </div>

            {/* KEY TAKEAWAYS SECTION */}
            <div className="bg-white rounded-2xl border shadow-sm p-8">
                <p className="font-bold text-xl mb-6 text-gray-800 border-b pb-4">Key Takeaways</p>

                <ul className="space-y-4">
                    {summaryPoints.map((point, index) => (
                        <li key={index} className="flex gap-4 items-start">
                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                                {index + 1}
                            </span>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {point.trim()}.
                            </p>
                        </li>
                    ))}
                </ul>

                {summaryPoints.length === 0 && (
                    <p className="text-gray-500 italic">No key takeaways could be extracted.</p>
                )}
            </div>

            {/* STATS AND DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Highlights Card */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                    <p className="font-bold text-lg mb-4 text-gray-800">Highlights</p>
                    <div className="space-y-3">
                        <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm font-medium border border-green-100">
                            ✓ Successfully captured {recording.duration} seconds of audio.
                        </div>
                        <div className="bg-purple-50 text-purple-700 p-3 rounded-xl text-sm font-medium border border-purple-100">
                            💡 Processed locally in-browser.
                        </div>
                    </div>
                </div>

                {/* Technical Info Card */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                    <p className="font-bold text-lg mb-4 text-gray-800">Processing Info</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex justify-between">
                            <span>Engine:</span>
                            <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">Web Speech API</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Privacy:</span>
                            <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">100% Client-side</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Storage:</span>
                            <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">LocalStorage</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Summary;
