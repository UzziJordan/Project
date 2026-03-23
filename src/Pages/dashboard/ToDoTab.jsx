import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiCircle, FiCalendar, FiPlus, FiClock } from "react-icons/fi";
import { databases } from '../../lib/appwrite';
import { DATABASE_ID, RECORDINGS_COLLECTION_ID } from '../../lib/databaseConfig';
import { useNavigate } from 'react-router-dom';

/**
 * ToDoTab Component
 * Purpose: Manages action items specifically associated with a particular recording.
 */
const ToDoTab = () => {
    // --- STATE AND HOOKS ---
    const [recording, setRecording] = useState(null);
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    // --- SIDE EFFECTS ---
    useEffect(() => {
        const latest = localStorage.getItem('latestRecording');
        if (latest) {
            try {
                const parsed = JSON.parse(latest);
                setRecording(parsed);
                // Ensure todos is an array
                const rawTodos = parsed.todos || [];
                // If it's a string (AI might return it as such), try to parse it
                if (typeof rawTodos === 'string') {
                    try {
                        setTodos(JSON.parse(rawTodos));
                    } catch (e) {
                        setTodos([]);
                    }
                } else {
                    setTodos(rawTodos);
                }
            } catch (e) {
                console.error("Error parsing latestRecording:", e);
            }
        }
    }, []);

    // --- HELPERS ---
    const formatDuration = (seconds) => {
        if (!seconds) return "0 sec";

        const sec = Math.floor(seconds);
        const mins = Math.floor(sec / 60);
        const hrs = Math.floor(mins / 60);

        if (sec < 60) return `${sec} sec`;
        if (mins < 60) return `${mins} min`;

        const remainingMins = mins % 60;
        return `${hrs}h ${remainingMins}min`;
    };

    const formatFullDate = (date) => {
        if (!date) return "Unknown date";

        const d = new Date(date);

        return d.toLocaleString("en-GB", {
            weekday: "short",   // Tue
            day: "2-digit",     // 23
            month: "short",     // Aug
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,      // 19:26:54
        });
    };

    const pendingTodos = todos.filter(t => !t.completed);
    const completedTodos = todos.filter(t => t.completed);

    // --- HANDLERS ---
    const toggleTodo = async (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);

        // Update recording state
        const updatedRecording = { ...recording, todos: newTodos };
        setRecording(updatedRecording);

        // Update localStorage
        localStorage.setItem('latestRecording', JSON.stringify(updatedRecording));

        // Update Appwrite Database if we have an ID
        if (recording.$id) {
            try {
                await databases.updateDocument(
                    DATABASE_ID,
                    RECORDINGS_COLLECTION_ID,
                    recording.$id,
                    { todos: JSON.stringify(newTodos) }
                );
            } catch (error) {
                console.error("Error updating Appwrite todos:", error);
            }
        }
    };

    // --- RENDER ---
    if (!recording) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>No recording selected.</p>
                <p className="text-sm">Go to the library to select a recording.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-geist">
            {/* UNIFIED HEADER SECTION */}
            <div className="bg-[#EAEAFC] p-6 rounded-2xl flex justify-between items-center">
                <div>
                    <h2 className="font-extrabold text-[22px] text-[#000000]">
                        {recording.title}
                    </h2>
                    
                    <p className="text-[16px] text-[#555555] mt-1 flex items-center gap-2 flex-wrap">
                        {/* DATE */}
                        <span className="flex items-center gap-1">
                            <FiCalendar className="text-[#555555]" />
                            {formatFullDate(recording.date)}
                        </span>

                        <span>·</span>

                        {/* DURATION */}
                        <span className="flex items-center gap-1">
                            <FiClock className="text-[#555555]" />
                            {formatDuration(recording.duration)}
                        </span>

                        <span>·</span>

                        {/* PROGRESS */}
                        <span className="text-indigo-600 font-bold">
                            {completedTodos.length} / {todos.length} Completed
                        </span>
                    </p>                
                </div>

                <span className="hidden md:flex text-[14px] bg-white text-[#2828FA] px-4 py-1.5 rounded-full font-bold items-center gap-1 shadow-sm">
                    <span className="animate-pulse">✦</span> AI Generated
                </span>
            </div>

            {/* PENDING TASKS SECTION */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                    Pending Tasks <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[10px]">{pendingTodos.length}</span>
                </h3>
                
                {pendingTodos.length === 0 && (
                    <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-400">
                        <p className="text-sm">No pending tasks. Great job!</p>
                    </div>
                )}

                <div className="grid gap-3">
                    {todos.map((todo, index) => !todo.completed && (
                        <div 
                            key={index}
                            onClick={() => toggleTodo(index)}
                            className="bg-white border rounded-xl p-5 flex items-center gap-4 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
                        >
                            <div className="text-2xl text-gray-300 group-hover:text-indigo-400 transition">
                                <FiCircle />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-800 font-medium">{todo.task || todo.text}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                    <span className="bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded font-bold uppercase text-[9px]">AI Identified</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 italic">
                                        <FiCalendar className="text-[10px]" /> Suggested: ASAP
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COMPLETED TASKS SECTION */}
            <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    Completed <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[10px]">{completedTodos.length}</span>
                </h3>

                <div className="grid gap-3">
                    {todos.map((todo, index) => todo.completed && (
                        <div 
                            key={index}
                            onClick={() => toggleTodo(index)}
                            className="bg-gray-50/50 border border-gray-100 rounded-xl p-5 flex items-center gap-4 cursor-pointer opacity-70 group"
                        >
                            <div className="text-2xl text-green-500">
                                <FiCheckCircle />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-500 font-medium line-through">{todo.task || todo.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ACTION SECTION */}
            <button 
                onClick={() => navigate("/dashboard/todo")} 
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-sm hover:border-indigo-300 hover:text-indigo-500 transition flex items-center justify-center gap-2"
            >
                <FiPlus /> Add Manual Task
            </button>
        </div>
    );
};

export default ToDoTab;
