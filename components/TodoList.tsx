"use client";
import React, { useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [TaskList, setTaskList] = useState([]);

  // Handle form submission
  const changeHandle = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    const newTask = {
      todo,
      description,
      completed: false,
      createdAt: new Date().toLocaleString(), // Add current date and time
    };
    setTaskList([...TaskList, newTask]); // Add new task immutably
    setTodo("");
    setDescription(""); // Clear the input fields
  };

  // Handle task deletion
  const deleteHandle = (index) => {
    const updatedTaskList = TaskList.filter((_, i) => i !== index); // Use filter for immutability
    setTaskList(updatedTaskList);
  };

  // Handle task completion toggle
  const toggleComplete = (index) => {
    const updatedTaskList = TaskList.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTaskList);
  };

  // Render tasks or "No Task Available" message
  let task = <p className="text-emerald-600 text-center">No Task Available</p>;

  if (TaskList.length > 0) {
    task = TaskList.map((t, i) => (
      <div
        key={i} // Ensure the key is on the outermost element
        className="bg-white mb-5 p-4 flex flex-col items-start gap-4 rounded-xl shadow-md border-l-4 border-emerald-300 hover:border-emerald-500 group transition-all"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(i)}
              className="h-6 w-6 border-2 border-emerald-200 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors"
              aria-label={t.completed ? "Mark task as incomplete" : "Mark task as complete"}
            />
            <div className="flex-grow">
              <p className={`text-emerald-800 text-lg ${t.completed ? "line-through" : ""}`}>
                {t.todo}
              </p>
              <p className="text-emerald-600 text-xs">{t.description}</p>
            </div>
          </div>

          <button
            onClick={() => deleteHandle(i)}
            className="text-red-400 hover:text-red-600 transition-colors p-1"
            aria-label="Delete task"
          >
            Delete
          </button>
        </div>

        <div className="w-full">
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-emerald-400">📅 Created: {t.createdAt}</span>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <main className="min-h-screen bg-emerald-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800 mb-4">
            CodeGenius.Dev Todo List
          </h1>
          <p className="text-emerald-600">Your Productivity Partner</p>
        </div>

        <form
          onSubmit={changeHandle}
          className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-emerald-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="todo"
              value={todo}
              placeholder="✍️ Add new todo..."
              className="p-3 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 placeholder-emerald-400 text-emerald-800 transition-all"
              onChange={(e) => setTodo(e.target.value)}
              aria-label="Add new todo"
              required
            />
            <input
              type="text"
              name="description"
              value={description}
              placeholder="📝 Add description..."
              className="p-3 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 placeholder-emerald-400 text-emerald-800 transition-all"
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Add task description"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all transform active:scale-95"
            aria-label="Add todo"
          >
            🌱 Add Todo
          </button>
        </form>

        <hr className="my-4 border-emerald-300" />

        <div>{task}</div>
      </div>
    </main>
  );
};

export default TodoList;