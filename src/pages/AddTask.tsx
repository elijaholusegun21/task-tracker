import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTasks } from "../hooks/UseTask";
import type { TaskStatus } from "../types/Task";

const AddTask = () => {
  const navigate = useNavigate();

  const { addTask } = useTasks();

  const titleInputRef =
    useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState<TaskStatus>("pending");

  const [error, setError] = useState("");

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      setError(
        "Please enter a task title."
      );
      return;
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      status,
    });

    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm"
      >
        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Add Task
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create a new task and keep your
            workflow organized.
          </p>
        </div>

        {/* TITLE */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              Title
            </label>

            <span className="text-xs text-slate-500">
              {title.length}/100
            </span>
          </div>

          <input
            ref={titleInputRef}
            type="text"
            maxLength={100}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Enter task title"
            className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {error && (
            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={5}
            placeholder="Enter task description"
            className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target
                  .value as TaskStatus
              )
            }
            className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-3 font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
