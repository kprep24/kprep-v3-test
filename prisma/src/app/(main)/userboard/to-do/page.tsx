"use client"

import Navbar from "@/components/landingPage/Navbar";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ToDoList = () => {
  interface Task {
    id: number;
    text: string;
    description: string;
    completed: boolean;
  }
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [showCompleted, setShowCompleted] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, description: newDescription, completed: false }]);
      setNewTask("");
      setNewDescription("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = filter === "all" ? tasks : filter === "completed" ? tasks.filter(task => task.completed) : tasks.filter(task => !task.completed);

  return (
  <div>
    {/* <Navbar/> */}
      <div className="  mx-auto  justify-center flex flex-col rounded-lg text-gray-900">
      <div className="bg-[#74AA63] dark:bg-[#425f71] p-6 rounded-ee-[100px] text-white text-5xl h-[40vh] xl:px-20 smLpx-10 px-4 font-bold text-start justify-end flex flex-col items-start">
        <h1 className="xl:text-5xl text-4xl te mb-2">TO - DO</h1>
        <h1 className="xl:text-5xl text-4xl te">List</h1>
      </div>
      
  <div className="xl:w-[500px] mx-auto bg-[#FFFEF7] dark:bg-[#040710] ">
  <div className="flex flex-col space-y-4 p-4 ">
        <input
          type="text"
          placeholder="✨ Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-3 border-b-2 border-gray-400 focus:border-green-500 dark:focus:border-[#2676a7] outline-none text-lg bg-transparent w-full text-black dark:text-white"
        />
        <input
          type="text"
          placeholder="📝 Add a description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="p-3 border-b-2 border-gray-400 focus:border-green-500 dark:focus:border-[#2676a7] outline-none text-lg bg-transparent w-full text-black dark:text-white"
        />
        <button onClick={addTask} className="bg-green-500 dark:bg-[#2676a7] hover:dark:bg-[#308fc9] text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all">+ Add Task</button>
      </div>
      
      <div className="flex justify-around py-4 xl:text-base text-sm gap-4 font-semibold">
        <span className={`cursor-pointer px-3 py-1.5 rounded-full ${filter === "all" ? "bg-black dark:bg-white dark:text-black text-white border-white shadow" : "bg-transparent border  dark:text-white text-black dark:border-white border-black"}`} onClick={() => setFilter("all")}>All Tasks</span>
        <span className={`cursor-pointer px-3 py-1.5 rounded-full ${filter === "incomplete" ? "bg-black dark:bg-white dark:text-black text-white border-white shadow" : "bg-transparent border dark:text-white text-black dark:border-white border-black"}`} onClick={() => setFilter("incomplete")}>Incomplete</span>
        <span className={`cursor-pointer px-3 py-1.5 rounded-full ${filter === "completed" ? "bg-black dark:bg-white dark:text-black text-white border-white shadow" : "bg-transparent border dark:text-white text-black dark:border-white border-black"}`} onClick={() => setFilter("completed")}>Completed</span>
      </div>
      
      <div className="space-y-3">
        {filteredTasks.filter(task => !task.completed).map(task => (
          <div key={task.id} className="bg-[#7FA265] dark:bg-[#477693] flex items-center p-4 rounded-lg shadow-md transition-all hover:scale-105">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id={`task-${task.id}`}
                className="mr-3 w-6 h-6 cursor-pointer" 
                checked={task.completed} 
                onChange={() => toggleComplete(task.id)}
                aria-label={`Mark ${task.text} as completed`}
              />
              <label htmlFor={`task-${task.id}`} className="sr-only">Mark task as completed</label>
            </div>
            <div className="flex-1 text-white">
              <p className="font-semibold text-lg">{task.text}</p>
              <p className="text-sm text-gray-200">{task.description}</p>
            </div>
            <FaStar className="text-white cursor-pointer" />
            <button onClick={() => deleteTask(task.id)} className="ml-3 text-red-500 text-xl">❌</button>
          </div>
        ))}
      </div>
      
      <div className="py-4 text-sm font-semibold text-gray-600 cursor-pointer flex items-center" onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? "▼" : "▶"} Completed {tasks.filter(task => task.completed).length}
      </div>
      
      {showCompleted && (
        <div className="space-y-3">
          {tasks.filter(task => task.completed).map(task => (
            <div key={task.id} className="bg-gray-300 flex items-center p-4 rounded-lg shadow-md transition-all hover:scale-105">
              <input title="TASK" type="checkbox" className="mr-3 w-6 h-6 cursor-pointer" checked={task.completed} onChange={() => toggleComplete(task.id)} />
              <div className="flex-1 text-gray-700">
                <p className="font-semibold text-lg line-through">{task.text}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <FaStar className="text-gray-500 cursor-pointer" />
              <button onClick={() => deleteTask(task.id)} className="ml-3 text-red-500 text-xl">❌</button>
            </div>
          ))}
        </div>
      )}
  </div>
    </div>
  </div>
  );
};

export default ToDoList;
