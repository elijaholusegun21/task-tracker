import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import DeleteModal from "../components/DeleteModal";
import { useTasks } from "../hooks/UseTask";

const TaskDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const {
    tasks,
    deleteTask,
    toggleTaskStatus,
  } = useTasks();

  const task = tasks.find(
    (task) => task.id === id
  );

  if (!task) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">
          📋
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Task not found
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          The task you're looking for
          doesn't exist or may have been
          deleted.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back Home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);

    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white break-words">
              {task.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Created on{" "}
              {new Date(
                task.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <span
            className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
              task.status ===
              "completed"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
          >
            {task.status}
          </span>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Description
          </h2>

          <div className="mt-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">
              {task.description ||
                "No description provided."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() =>
              toggleTaskStatus(task.id)
            }
            className={`flex-1 py-3 rounded-xl font-medium transition ${
              task.status ===
              "completed"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            {task.status ===
            "completed"
              ? "Mark as Pending"
              : "Mark as Complete"}
          </button>

          <Link
            to={`/task/${task.id}/edit`}
            className="flex-1 text-center py-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium hover:opacity-90 transition"
          >
            Edit Task
          </Link>

          <button
            onClick={() =>
              setShowDeleteModal(true)
            }
            className="flex-1 py-3 rounded-xl bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 font-medium hover:opacity-90 transition"
          >
            Delete Task
          </button>
        </div>

        {/* Back */}
        <div className="mt-8">
          <Link
            to="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Tasks
          </Link>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() =>
          setShowDeleteModal(false)
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TaskDetails;