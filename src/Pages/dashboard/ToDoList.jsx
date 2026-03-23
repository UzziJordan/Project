import React, { useState, useEffect } from 'react';
import Searchbar from '../../Components/Dashboard/Searchbar';
import { FiPlus } from 'react-icons/fi';
import { databases, account, ID } from '../../lib/appwrite';
import { DATABASE_ID, TODOS_COLLECTION_ID } from '../../lib/databaseConfig';
import { Query } from 'appwrite';

/**
 * ToDoList Component
 * Purpose: Manages a general list of tasks for the user, with persistence and progress tracking.
 */
const ToDoList = () => {

    // --- STATE AND HOOKS ---
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [newTask, setNewTask] = useState("");


    // --- SIDE EFFECTS ---

    // Fetch tasks from Appwrite
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


    // --- LOGIC AND FILTERING ---
    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);


    // Calculate weekly progress
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const completedThisWeek = completedTasks.filter(task =>
        new Date(task.createdAt) >= sevenDaysAgo
    ).length;

    const weeklyGoal = 8;
    const progressPercent = (completedThisWeek / weeklyGoal) * 100;


    // --- HANDLERS ---
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
            alert("Failed to add task. Make sure Database and Collection IDs are set correctly.");
        }
    };


    const toggleTask = async (id) => {
        try {
            const taskToToggle = tasks.find(t => t.$id === id);
            const response = await databases.updateDocument(
                DATABASE_ID,
                TODOS_COLLECTION_ID,
                id,
                { completed: !taskToToggle.completed }
            );

            setTasks(
                tasks.map(task =>
                    task.$id === id ? response : task
                )
            );
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };


    // --- RENDER ---
    return (
        <div className='text-geist pt-20'>

            <Searchbar />

            <div className="pt-7 px-18">

                {/* HEADER SECTION */}
                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-semibold">
                            To-Do List
                        </h1>

                        {loading ? (
                            <p className="text-gray-500 text-sm mt-2">Loading tasks...</p>
                        ) : (
                            <div className="flex gap-3 mt-2 text-gray-500 text-sm">
                                <p>{pendingTasks.length} pending</p>
                                <p>{completedTasks.length} completed</p>
                                <p>Total {tasks.length} tasks</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setShowInput(!showInput)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                        <FiPlus />
                        Add Task
                    </button>

                </div>


                {/* TASK INPUT SECTION */}
                {showInput && (
                    <div className="mt-4 flex gap-2">

                        <input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="Enter task..."
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleAddTask();
                            }}
                        />

                        <button
                            onClick={handleAddTask}
                            className="bg-indigo-600 text-white px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Add
                        </button>

                    </div>
                )}


                {/* WEEKLY PROGRESS SECTION */}
                <div className="bg-white border border-[#EBEBEB] rounded-xl p-7 mt-5 shadow-sm">

                    <div className="flex justify-between text-sm mb-2 font-semibold">
                        <span>Weekly Progress</span>

                        <span className="text-indigo-600">
                            {completedThisWeek} / {weeklyGoal}
                        </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                            style={{ width: `${progressPercent}%` }}
                            className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
                        ></div>
                    </div>

                </div>


                {/* PENDING TASKS LIST */}
                <div className='mt-8'>

                    <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-widest">
                        PENDING
                    </p>

                    <div className="space-y-3">

                        {loading ? (
                            <div className="p-8 text-center text-gray-400">Loading...</div>
                        ) : pendingTasks.length === 0 ? (
                            <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-400 text-sm">
                                No pending tasks. Time to relax!
                            </div>
                        ) : pendingTasks.map(task => (
                            <div
                                key={task.$id}
                                className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex justify-between items-center shadow-sm"
                            >
                                <div className="flex items-start gap-3">

                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.$id)}
                                        className="mt-1.5 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />

                                    <p className="text-gray-800 font-medium">
                                        {task.text}
                                    </p>

                                </div>

                                <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-bold">
                                    Pending
                                </span>
                            </div>
                        ))}

                    </div>
                </div>


                {/* COMPLETED TASKS LIST */}
                <div className='mt-8 pb-10'>

                    <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-widest">
                        COMPLETED
                    </p>

                    <div className="space-y-3">

                        {!loading && completedTasks.length === 0 && (
                            <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-400 text-sm">
                                No completed tasks yet.
                            </div>
                        )}

                        {!loading && completedTasks.map(task => (
                            <div
                                key={task.$id}
                                className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex justify-between items-center shadow-sm opacity-70"
                            >
                                <div className="flex items-start gap-3">

                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.$id)}
                                        className="mt-1.5 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />

                                    <p className="line-through text-gray-500">
                                        {task.text}
                                    </p>

                                </div>

                                <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-bold">
                                    Done
                                </span>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ToDoList;
