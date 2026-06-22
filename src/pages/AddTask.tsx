import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTasks } from "../hooks/UseTask";
import type {TaskStatus,TaskPriority,} from "../types/Task";

const AddTask = () => {
  const navigate = useNavigate();

  const { addTask } = useTasks();

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState<TaskStatus>("pending");

  const [priority, setPriority] =
    useState<TaskPriority>("medium");

  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error(
        "Task title is required"
      );
      return;
    }

    addTask({
      title,
      description,
      status,
      priority,
      dueDate
    });

    toast.success(
      "Task created successfully"
    );

    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6"
      >
        <div>
          <h1 className="text-2xl font-bold">
            Add Task
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Create a new task and track
            your progress.
          </p>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter task title"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target
                  .value as TaskPriority
              )
            }
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">
              🔴 High
            </option>

            <option value="medium">
              🟡 Medium
            </option>

            <option value="low">
              🟢 Low
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-3 font-medium transition hover:opacity-90"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;