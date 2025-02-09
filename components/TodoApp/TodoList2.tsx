"use client";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        history: [...state.history, state.tasks],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((_, i) => i !== action.payload),
        history: [...state.history, state.tasks],
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task, i) =>
          i === action.payload.index
            ? { ...task, ...action.payload.updates }
            : task
        ),
        history: [...state.history, state.tasks],
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task, i) =>
          i === action.payload ? { ...task, completed: !task.completed } : task
        ),
        history: [...state.history, state.tasks],
      };
    case "REORDER_TASKS":
      return {
        ...state,
        tasks: action.payload,
        history: [...state.history, state.tasks],
      };
    case "UNDO":
      return {
        ...state,
        tasks: state.history[state.history.length - 1],
        history: state.history.slice(0, -1),
      };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [], history: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Load/Save to LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    dispatch({ type: "SET_TASKS", payload: savedTasks });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Handlers
  const addTask = useCallback((todo, description, priority, dueDate) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: uuidv4(),
        todo,
        description,
        priority,
        dueDate,
        completed: false,
        createdAt: new Date().toLocaleString(),
      },
    });
  }, []);

  const deleteTask = useCallback((index) => {
    dispatch({ type: "DELETE_TASK", payload: index });
  }, []);

  const editTask = useCallback((index, updates) => {
    dispatch({ type: "EDIT_TASK", payload: { index, updates } });
  }, []);

  const toggleComplete = useCallback((index) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: index });
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const items = Array.from(state.tasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      dispatch({ type: "REORDER_TASKS", payload: items });
    },
    [state.tasks]
  );

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  // Filter/Pagination
  const filteredTasks = state.tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.todo.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <main className="min-h-screen bg-emerald-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800 mb-4">
            Todo Manager Pro
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400">
            Your Smart Productivity Hub
          </p>
        </header>

        <TaskForm addTask={addTask} />

        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border-2 border-emerald-100 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-300"
            aria-label="Search tasks"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border-2 border-emerald-100 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-300"
            aria-label="Filter tasks"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {currentTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          task={task}
                          index={index}
                          toggleComplete={toggleComplete}
                          deleteTask={deleteTask}
                          editTask={editTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="flex justify-between items-center">
          <button
            onClick={undo}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
            aria-label="Undo last action"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            Undo
          </button>

          <div className="flex gap-2">
            {Array.from({
              length: Math.ceil(filteredTasks.length / tasksPerPage),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                }`}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(TodoList);
