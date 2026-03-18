import React, { useEffect, useState } from 'react'
import { FiCheckCircle, FiCircle, FiCalendar, FiClock, FiPlus } from "react-icons/fi";

const ToDoTab = () => {
  const [recording, setRecording] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const latest = localStorage.getItem('latestRecording');
    if (latest) {
      const parsed = JSON.parse(latest);
      setRecording(parsed);
      setTodos(parsed.todos || []);
    }
  }, []);

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    
    // Update recording in localStorage
    const updatedRecording = { ...recording, todos: newTodos };
    setRecording(updatedRecording);
    localStorage.setItem('latestRecording', JSON.stringify(updatedRecording));
    
    // Update in recordings list as well
    const recordings = JSON.parse(localStorage.getItem('recordings')) || [];
    const updatedRecordings = recordings.map(r => r.id === recording.id ? updatedRecording : r);
    localStorage.setItem('recordings', JSON.stringify(updatedRecordings));
  };

  if (!recording) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p>No recording selected.</p>
        <p className="text-sm">Go to the recording page to start a new session.</p>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  const pendingTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto pb-20">

      {/* Header */}
      <div className="bg-indigo-50 p-6 rounded-2xl flex justify-between items-center border border-indigo-100 shadow-sm">
        <div>
          <h2 className="font-bold text-2xl text-indigo-900">
            Action Items & To-Dos
          </h2>
          <p className="text-sm text-indigo-600 font-medium mt-1">
            {recording.title} · {formatTime(recording.duration)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] bg-indigo-600 text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            AI Extracted
          </span>
          <p className="text-xs text-indigo-400 font-bold">
            {completedTodos.length} / {todos.length} COMPLETED
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
          <span>Overall Progress</span>
          <span className="text-indigo-600">{todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
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
                <p className="text-gray-800 font-medium">{todo.task}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded font-bold uppercase text-[9px]">High Priority</span>
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

      {/* Completed Tasks */}
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
                <p className="text-gray-500 font-medium line-through">{todo.task}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Add */}
      <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-sm hover:border-indigo-300 hover:text-indigo-500 transition flex items-center justify-center gap-2">
        <FiPlus /> Add Manual Task
      </button>

    </div>
  )
}

export default ToDoTab