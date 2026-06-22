import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../hooks/UseTask";
import type { TaskStatus } from "../types/Task";
import TaskChart from "../components/TaskChart";

type Filter = "all" | TaskStatus;

const filters: Filter[] = [
  "all",
  "pending",
  "completed",
];

const Home = () => {
  const { tasks } = useTasks();

  const [filter, setFilter] =
    useState<Filter>("all");

  const [search, setSearch] =
    useState("");
    
  const [sortBy, setSortBy] = useState<
   "newest" | "oldest" | "priority"
  >("newest");

  const filteredTasks = tasks
  .filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : task.status === filter;

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      task.description
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    return (
      matchesFilter &&
      matchesSearch
    );
  })
  .sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
      );
    }

    if (sortBy === "oldest") {
      return (
        new Date(
          a.createdAt
        ).getTime() -
        new Date(
          b.createdAt
        ).getTime()
      );
    }

    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return (
      priorityOrder[
        b.priority
      ] -
      priorityOrder[
        a.priority
      ]
    );
  });

  const stats = {
    total: tasks.length,

    pending: tasks.filter(
      (task) =>
        task.status === "pending"
    ).length,

    completed: tasks.filter(
      (task) =>
        task.status === "completed"
    ).length,

    high: tasks.filter(
      (task) =>
        task.priority === "high"
    ).length,

    medium: tasks.filter(
      (task) =>
        task.priority === "medium"
    ).length,

    low: tasks.filter(
      (task) =>
        task.priority === "low"
    ).length,
  };

  const completionRate =
  stats.total === 0
    ? 0
    : Math.round(
        (stats.completed /
          stats.total) *
          100
      );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          My Tasks
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Organize your work, one task at a
          time.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
          <p className="text-xs text-slate-500">
            Total
          </p>

          <p className="text-xl sm:text-2xl font-bold mt-1">
            {stats.total}
          </p>
        </div>

        <div className="rounded-xl border border-yellow-300 dark:border-yellow-800 bg-white dark:bg-slate-900 p-4 text-center">
          <p className="text-xs text-slate-500">
            Pending
          </p>

          <p className="text-xl sm:text-2xl font-bold text-yellow-500 mt-1">
            {stats.pending}
          </p>
        </div>

        <div className="rounded-xl border border-green-300 dark:border-green-800 bg-white dark:bg-slate-900 p-4 text-center">
          <p className="text-xs text-slate-500">
            Done
          </p>

          <p className="text-xl sm:text-2xl font-bold text-green-500 mt-1">
            {stats.completed}
          </p>
        </div>
      </div>

      <TaskChart />

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Progress
          </h2>

          <span className="text-sm text-slate-500">
            {completionRate}%
          </span>
        </div>

        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{
              width: `${completionRate}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {stats.completed} of {stats.total} tasks completed
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 p-4 text-center">
          <p className="text-sm text-red-500">
            🔴 High Priority
          </p>

          <p className="text-2xl font-bold mt-1">
            {stats.high}
          </p>
        </div>

        <div className="rounded-xl border border-yellow-200 dark:border-yellow-900 bg-white dark:bg-slate-900 p-4 text-center">
          <p className="text-sm text-yellow-500">
            🟡 Medium Priority
          </p>

          <p className="text-2xl font-bold mt-1">
            {stats.medium}
          </p>
        </div>

        <div className="rounded-xl border border-green-200 dark:border-green-900 bg-white dark:bg-slate-900 p-4 text-center">
          <p className="text-sm text-green-500">
            🟢 Low Priority
          </p>

          <p className="text-2xl font-bold mt-1">
            {stats.low}
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full sm:max-w-md rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

       <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as
                  | "newest"
                  | "oldest"
                  | "priority"
              )
            }
            className="rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          >
            <option value="newest">
              Newest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="priority">
              Priority
            </option>
          </select>

          <p className="text-sm text-slate-500">
            {filteredTasks.length} task
            {filteredTasks.length !==
              1 && "s"}
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">
        {filters.map((type) => (
          <button
            key={type}
            onClick={() =>
              setFilter(type)
            }
            className={`px-4 py-2 rounded-full text-sm border transition ${
              filter === type
                ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                : "border-gray-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredTasks.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 border border-dashed border-gray-300 dark:border-slate-700 rounded-xl">
          <div className="text-5xl mb-4">
            📋
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            No tasks found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Create a task or adjust your
            search and filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredTasks.map((task) => {
          const isOverdue =
            task.status === "pending" &&
            task.dueDate &&
            new Date(task.dueDate) < new Date();

          return (
            <Link
              key={task.id}
              to={`/task/${task.id}`}
              className="group block"
            >
              <div className="h-full p-5 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white break-words">
                    {task.title}
                  </h3>

                  <span
                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {(task.priority ?? "medium").toUpperCase()}
                  </span>

                  {isOverdue && (
                    <span className="text-xs px-2 py-1 rounded-full bg-red-600 text-white">
                      OVERDUE
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                  {task.description ||
                    "No description provided"}
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  Created:{" "}
                  {new Date(
                    task.createdAt
                  ).toLocaleDateString()}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Due:
                  {task.dueDate
                    ? ` ${new Date(
                        task.dueDate
                      ).toLocaleDateString()}`
                    : " No due date"}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    View Details →
                  </span>

                  <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition">
                    Open
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Home;