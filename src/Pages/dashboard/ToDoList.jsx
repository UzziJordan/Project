import React, { useState, useEffect } from 'react';
import Searchbar from '../../Components/Dashboard/Searchbar';
import { FiPlus } from 'react-icons/fi';

/**
 * ToDoList Component
 * Purpose: Manages a general list of tasks for the user, with persistence and progress tracking.
 */
const ToDoList = () => {

    // --- STATE AND HOOKS ---
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('generalTodos');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [showInput, setShowInput] = useState(false);
    const [newTask, setNewTask] = useState("");


    // --- SIDE EFFECTS ---

    // Persist tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('generalTodos', JSON.stringify(tasks));
    }, [tasks]);


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
    const handleAddTask = () => {
        if (!newTask.trim()) return;

        const task = {
            id: Date.now(),
            text: newTask,
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTasks([task, ...tasks]);
        setNewTask("");
        setShowInput(false);
    };


    const toggleTask = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
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

                        <div className="flex gap-3 mt-2 text-gray-500 text-sm">
                            <p>{pendingTasks.length} pending</p>
                            <p>{completedTasks.length} completed</p>
                            <p>Total {tasks.length} tasks</p>
                        </div>
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

                        {pendingTasks.length === 0 && (
                            <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-400 text-sm">
                                No pending tasks. Time to relax!
                            </div>
                        )}

                        {pendingTasks.map(task => (
                            <div
                                key={task.id}
                                className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex justify-between items-center shadow-sm"
                            >
                                <div className="flex items-start gap-3">

                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
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

                        {completedTasks.length === 0 && (
                            <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-400 text-sm">
                                No completed tasks yet.
                            </div>
                        )}

                        {completedTasks.map(task => (
                            <div
                                key={task.id}
                                className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex justify-between items-center shadow-sm opacity-70"
                            >
                                <div className="flex items-start gap-3">

                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
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