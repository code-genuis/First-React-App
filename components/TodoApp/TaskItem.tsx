"use client";
import React, { useState } from "react";

const TaskItem = ({ task, index, toggleComplete, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(task.todo);
  const [editedDesc, setEditedDesc] = useState(task.description);

  const handleSave = () => {
    editTask(index, { todo: editedTodo, description: editedDesc });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4 border-emerald-300 hover:border-emerald-400 transition-all group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => toggleComplete(index)}
            className={`mt-1 w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-colors
              ${task.completed 
                ? "bg-emerald-500 border-emerald-500" 
                : "border-emerald-200 hover:border-emerald-300"}
            `}
            aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
          >
            {task.completed && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                  className="w-full p-2 mb-2 border rounded-lg"
                  aria-label="Edit task title"
                />
                <input
                  type="text"
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  aria-label="Edit task description"
                />
              </>
            ) : (
              <>
                <h3 className={`text-lg ${task.completed ? "line-through text-gray-400" : "text-emerald-800 dark:text-gray-200"}`}>
                  {task.todo}
                </h3>
                {task.description && (
                  <p className="text-sm text-emerald-600 dark:text-gray-400 mt-1">
                    {task.description}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-emerald-600 hover:text-emerald-700 px-2 py-1 rounded"
              aria-label="Save changes"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 px-2 py-1 rounded"
              aria-label="Edit task"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => deleteTask(index)}
            className="text-red-600 hover:text-red-700 px-2 py-1 rounded"
            aria-label="Delete task"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium 
            ${task.priority === "high" ? "bg-red-100 text-red-800" :
              task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
              "bg-green-100 text-green-800"}`
          }>
            {task.priority} priority
          </span>
          {task.dueDate && (
            <span className="text-emerald-600 dark:text-emerald-400">
              ⏳ {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
        <span className="text-gray-500 text-xs">
          Created: {task.createdAt}
        </span>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);