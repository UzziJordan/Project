import React, { useEffect, useState } from 'react';
import { databases, account } from '../../lib/appwrite';
import { DATABASE_ID, RECORDINGS_COLLECTION_ID, TODOS_COLLECTION_ID } from '../../lib/databaseConfig';
import { Query } from 'appwrite';

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
        const fetchStats = async () => {
            try {
                const user = await account.get();
                
                // Fetch recordings
                const recordingsResponse = await databases.listDocuments(
                    DATABASE_ID,
                    RECORDINGS_COLLECTION_ID,
                    [Query.equal('userId', [user.$id])]
                );
                
                const recordings = recordingsResponse.documents;
                const totalRecordings = recordings.length;

                const totalDurationSeconds = recordings.reduce(
                    (acc, curr) => acc + (curr.duration || 0),
                    0
                );

                // Fetch general todos
                const todosResponse = await databases.listDocuments(
                    DATABASE_ID,
                    TODOS_COLLECTION_ID,
                    [
                        Query.equal('userId', [user.$id]),
                        Query.equal('completed', [false])
                    ]
                );
                
                const pendingGeneralTodos = todosResponse.total;

                // Calculate pending tasks from recordings (if stored as sub-attributes)
                // In the current schema we aren't storing them separately yet,
                // but we can count general pending tasks.
                
                setStats({
                    totalRecordings,
                    totalDuration: totalDurationSeconds,
                    pendingTasks: pendingGeneralTodos,
                    meetingsWithTasks: 0 // This would need a more complex query if we had recording-specific tasks
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
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