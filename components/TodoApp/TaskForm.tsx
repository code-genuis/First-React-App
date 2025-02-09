"use client";
import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({
    todo: "",
    description: "",
    priority: "low",
    dueDate: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.todo.trim()) {
      setError("Task title is required!");
      return;
    }
    addTask(formData.todo, formData.description, formData.priority, formData.dueDate);
    setFormData({ todo: "", description: "", priority: "low", dueDate: "" });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="todo"
          value={formData.todo}
          placeholder="✍️ Task title"
          onChange={handleChange}
          className="p-3 border-2 border-emerald-100 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-300 placeholder-emerald-400 dark:placeholder-gray-500 text-emerald-800 dark:text-gray-200"
          aria-label="Task title"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="📝 Description (optional)"
          onChange={handleChange}
          className="p-3 border-2 border-emerald-100 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-300 placeholder-emerald-400 dark:placeholder-gray-500 text-emerald-800 dark:text-gray-200"
          aria-label="Task description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="p-3 border-2 border-emerald-100 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-300 text-emerald-800 dark:text-gray-200"
          aria-label="Task priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="p-3 border-2 border-emerald-100 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-300 text-emerald-800 dark:text-gray-200"
          aria-label="Due date"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
        aria-label="Add task"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Task
      </button>
    </form>
  );
};

export default React.memo(TaskForm);