import React, { useEffect, useState } from 'react'

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalRecordings: 0,
    totalDuration: 0,
    pendingTasks: 0,
    meetingsWithTasks: 0
  });

  useEffect(() => {
    const recordings = JSON.parse(localStorage.getItem('recordings')) || [];

    const totalRecordings = recordings.length;

    const totalDurationSeconds = recordings.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    
    // Calculate pending tasks across all recordings
    let pendingTasks = 0;
    let meetingsWithTasks = 0;

    recordings.forEach(rec => {
      if (rec.todos && Array.isArray(rec.todos)) {
        const pending = rec.todos.filter(t => !t.completed).length;
        pendingTasks += pending;
        if (pending > 0) {
          meetingsWithTasks++;
        }
      }
    });

    setStats({
      totalRecordings,
      totalDuration: totalDurationSeconds,
      pendingTasks,
      meetingsWithTasks
    });
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${seconds % 60}s`;
  };

  return (
    <div className="grid grid-cols-3 gap-6 mb-5 mt-2">

      <div className="bg-white px-6 rounded-xl shadow-sm pb-5 border border-transparent hover:border-indigo-100 transition">
        <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold ">TOTAL RECORDINGS</p>
        <h2 className="text-[28px] text-[#111827] font-bold">{stats.totalRecordings}</h2>
        <p className="text-[12px] text-[#9CA3AF] ">Lifetime history</p>
      </div>

      <div className="bg-white px-6 rounded-xl shadow-sm pb-5 border border-transparent hover:border-indigo-100 transition">
        <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold ">TOTAL DURATION</p>
        <h2 className="text-[28px] text-[#111827] font-bold">{formatDuration(stats.totalDuration)}</h2>
        <p className="text-[12px] text-[#9CA3AF] ">Across all sessions</p>
      </div>

      <div className="bg-white px-6 rounded-xl shadow-sm pb-5 border border-transparent hover:border-indigo-100 transition">
        <p className="text-sm pt-5 text-[#6B7280] text-[13px] font-semibold ">PENDING TASKS</p>
        <h2 className="text-[28px] text-[#111827] font-bold">{stats.pendingTasks}</h2>
        <p className="text-[12px] text-[#9CA3AF] ">
          {stats.meetingsWithTasks === 1 
            ? `From 1 meeting` 
            : `From ${stats.meetingsWithTasks} meetings`}
        </p>
      </div>

    </div>
  )
}

export default StatsCards