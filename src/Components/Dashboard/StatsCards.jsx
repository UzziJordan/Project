import React, { useEffect, useState } from 'react';

/**
 * StatsCards Component
 * Purpose: Displays summary statistics about recordings, duration, and pending tasks.
 */
const StatsCards = () => {

    // --- STATE AND HOOKS ---
    const [stats, setStats] = useState({
        totalRecordings: 0,
        totalDuration: 0,
        pendingTasks: 0,
        meetingsWithTasks: 0
    });


    // --- SIDE EFFECTS ---
    useEffect(() => {
        const recordings = JSON.parse(localStorage.getItem('recordings')) || [];

        const totalRecordings = recordings.length;

        const totalDurationSeconds = recordings.reduce(
            (acc, curr) => acc + (curr.duration || 0),
            0
        );

        // Calculate pending tasks across all recordings
        let pendingTasksCount = 0;
        let meetingsWithTasksCount = 0;

        recordings.forEach(rec => {
            if (rec.todos && Array.isArray(rec.todos)) {
                const pending = rec.todos.filter(t => !t.completed).length;

                pendingTasksCount += pending;

                if (pending > 0) {
                    meetingsWithTasksCount++;
                }
            }
        });

        setStats({
            totalRecordings,
            totalDuration: totalDurationSeconds,
            pendingTasks: pendingTasksCount,
            meetingsWithTasks: meetingsWithTasksCount
        });
    }, []);


    // --- HELPERS ---
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }

        return `${minutes}m ${seconds % 60}s`;
    };


    // --- RENDER ---
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-5 mt-2">

            {/* Total Recordings Card */}
            <div className="bg-white px-6 rounded-xl shadow-sm pb-5 border border-transparent hover:border-indigo-100 transition">
                <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold">
                    TOTAL RECORDINGS
                </p>

                <h2 className="text-[28px] text-[#111827] font-bold">
                    {stats.totalRecordings}
                </h2>

                <p className="text-[12px] text-[#9CA3AF]">
                    Lifetime history
                </p>
            </div>


            {/* Total Duration Card */}
            <div className="bg-white px-6 rounded-xl shadow-sm pb-5 border border-transparent hover:border-indigo-100 transition">
                <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold">
                    TOTAL DURATION
                </p>

                <h2 className="text-[28px] text-[#111827] font-bold">
                    {formatDuration(stats.totalDuration)}
                </h2>

                <p className="text-[12px] text-[#9CA3AF]">
                    Across all sessions
                </p>
            </div>


            {/* Pending Tasks Card */}
            <div className="bg-white px-6 rounded-xl shadow-sm pb-5 border border-transparent hover:border-indigo-100 transition">
                <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold">
                    PENDING TASKS
                </p>

                <h2 className="text-[28px] text-[#111827] font-bold">
                    {stats.pendingTasks}
                </h2>

                <p className="text-[12px] text-[#9CA3AF]">
                    {stats.meetingsWithTasks === 1
                    ? "From 1 meeting"
                    : `From ${stats.meetingsWithTasks} meetings`}
                </p>
            </div>

        </div>
    );
};

export default StatsCards;