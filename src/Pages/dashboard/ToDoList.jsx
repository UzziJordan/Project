// ================= IMPORTS =================
import React, { useState, useEffect } from 'react';
import Searchbar from '../../Components/Dashboard/Searchbar';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { databases, account, ID } from '../../lib/appwrite';
import { DATABASE_ID, TODOS_COLLECTION_ID } from '../../lib/databaseConfig';
import { Query } from 'appwrite';

/**
 * ToDoList Component
 * Purpose: Manages a general list of tasks for the user, with persistence and progress tracking.
 */
const ToDoList = () => {

    // ================= STATE & HOOKS =================
    const [tasks, setTasks] = useState([]);                 
    const [loading, setLoading] = useState(true);           
    const [showInput, setShowInput] = useState(false);      
    const [newTask, setNewTask] = useState("");             


    // ================= SIDE EFFECTS =================
    
    // Fetch user-specific tasks from Appwrite on mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const user = await account.get();
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    TODOS_COLLECTION_ID,
                    [Query.equal('userId', [user.$id])]
                );
                setTasks(response.documents);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);


    // ================= LOGIC & FILTERING =================
    
    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    // Calculate weekly progress (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const completedThisWeek = completedTasks.filter(task =>
        new Date(task.createdAt) >= sevenDaysAgo
    ).length;

    const weeklyGoal = 8;
    const progressPercent = Math.min((completedThisWeek / weeklyGoal) * 100, 100);


    // ================= EVENT HANDLERS =================

    // Create a new task in Appwrite
    const handleAddTask = async () => {
        if (!newTask.trim()) return;

        try {
            const user = await account.get();
            const taskData = {
                userId: user.$id,
                text: newTask,
                completed: false,
                createdAt: new Date().toISOString()
            };

            const response = await databases.createDocument(
                DATABASE_ID,
                TODOS_COLLECTION_ID,
                ID.unique(),
                taskData
            );

            setTasks([response, ...tasks]);
            setNewTask("");
            setShowInput(false);
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task.");
        }
    };

    // Toggle completion status in Appwrite
    const toggleTask = async (id) => {
        try {
            const taskToToggle = tasks.find(t => t.$id === id);
            const response = await databases.updateDocument(
                DATABASE_ID,
                TODOS_COLLECTION_ID,
                id,
                { completed: !taskToToggle.completed }
            );

            setTasks(tasks.map(task => task.$id === id ? response : task));
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };

    // Remove task from Appwrite
    const handleDeleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) return;

        try {
            await databases.deleteDocument(DATABASE_ID, TODOS_COLLECTION_ID, id);
            setTasks(tasks.filter(t => t.$id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task.");
        }
    };


    // ================= MAIN UI RENDER =================
    return (
        <div className='text-geist pt-20 font-geist'>

            <Searchbar />

            <div className="pt-7 px-18">

                {/* HEADER & COUNTERS */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold">To-Do List</h1>
                        {loading ? (
                            <p className="text-gray-500 text-sm mt-2">Loading tasks...</p>
                        ) : (
                            <div className="flex gap-3 mt-2 text-gray-500 text-sm">
                                <p>{pendingTasks.length} pending</p>
                                <p>{completedTasks.length} completed</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setShowInput(!showInput)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                        <FiPlus /> Add Task
                    </button>
                </div>

                {/* TASK INPUT AREA */}
                {showInput && (
                    <div className="mt-4 flex gap-2 animate-in slide-in-from-top-2 duration-200">
                        <input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="What needs to be done?"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                        />
                        <button onClick={handleAddTask} className="bg-indigo-600 text-white px-6 rounded-lg font-medium hover:bg-indigo-700">
                            Add
                        </button>
                    </div>
                )}

                {/* PROGRESS BAR */}
                <div className="bg-white border border-[#EBEBEB] rounded-xl p-7 mt-5 shadow-sm">
                    <div className="flex justify-between text-sm mb-2 font-semibold">
                        <span>Weekly Progress</span>
                        <span className="text-indigo-600">{completedThisWeek} / {weeklyGoal}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div style={{ width: `${progressPercent}%` }} className="h-2 bg-indigo-600 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* PENDING LIST */}
                <div className='mt-8'>
                    <p className="text-gray-400 text-sm font-bold mb-3 uppercase tracking-widest">Pending</p>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="p-8 text-center text-gray-400">Loading...</div>
                        ) : pendingTasks.length === 0 ? (
                            <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-400 text-sm">
                                No pending tasks.
                            </div>
                        ) : pendingTasks.map(task => (
                            <div key={task.$id} className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex justify-between items-center shadow-sm hover:border-indigo-200 transition">
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.$id)} className="mt-1.5 h-4 w-4 text-indigo-600" />
                                    <p className="text-gray-800 font-medium">{task.text}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="bg-orange-100 text-orange-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase">Pending</span>
                                    <button onClick={() => handleDeleteTask(task.$id)} className="text-gray-400 hover:text-red-500 transition"><FiTrash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COMPLETED LIST */}
                <div className='mt-8 pb-10'>
                    <p className="text-gray-400 text-sm font-bold mb-3 uppercase tracking-widest">Completed</p>
                    <div className="space-y-3">
                        {completedTasks.map(task => (
                            <div key={task.$id} className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex justify-between items-center shadow-sm opacity-70">
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.$id)} className="mt-1.5 h-4 w-4 text-indigo-600" />
                                    <p className="line-through text-gray-500 font-medium">{task.text}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="bg-green-100 text-green-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase">Done</span>
                                    <button onClick={() => handleDeleteTask(task.$id)} className="text-gray-400 hover:text-red-500 transition"><FiTrash2 size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ToDoList;