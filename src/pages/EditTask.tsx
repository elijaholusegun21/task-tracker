import { useState } from "react";
import {useNavigate,useParams,Link,} from "react-router-dom";
import { useTasks } from "../hooks/UseTask";
import type { TaskStatus } from "../types/Task";

const EditTask = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tasks,
    updateTask,
  } = useTasks();

  const task = tasks.find(
    (task) => task.id === id
  );

  const [title, setTitle] = useState(
    task?.title ?? ""
  );

  const [description, setDescription] =
    useState(
      task?.description ?? ""
    );

  const [status, setStatus] =
    useState<TaskStatus>(
      task?.status ?? "pending"
    );

  if (!task) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Task not found
        </h1>

        <p className="mt-2 text-slate-500">
          The task may have been deleted.
        </p>

        <Link
          to="/"
          className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back Home
        </Link>
      </div>
    );
  }

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) return;

    updateTask(
      task.id,
      title.trim(),
      description.trim(),
      status
    );

    navigate(`/task/${task.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-5 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit Task
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update your task details.
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
              setTitle(
                e.target.value
              )
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
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Enter task description"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-3 font-medium hover:opacity-90 transition"
          >
            Save Changes
          </button>

          <Link
            to={`/task/${task.id}`}
            className="flex-1 text-center rounded-lg border border-gray-300 dark:border-slate-700 py-3 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTask;