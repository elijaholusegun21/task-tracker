import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative top-0 z-50 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          TaskTracker ⚡
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-black dark:hover:text-white transition">
            Home
          </Link>
          <Link to="/add-task" className="hover:text-black dark:hover:text-white transition">
            Add Task
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Quick Add Button */}
          <Link
            to="/add-task"
            className="hidden sm:inline-block px-3 py-1.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium"
          >
            + New Task
          </Link>

          {/* Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl text-slate-900 dark:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-lg z-50">

            <div className="flex flex-col px-4 py-3 gap-3 text-slate-700 dark:text-slate-200">

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="py-2 border-b border-gray-200 dark:border-slate-700"
              >
                Home
              </Link>

              <Link
                to="/add-task"
                onClick={() => setOpen(false)}
                className="py-2 border-b border-gray-200 dark:border-slate-700"
              >
                Add Task
              </Link>

              {/* Theme toggle inside mobile menu */}
              <div className="pt-3 flex items-center justify-between">
                <span className="text-sm">Theme</span>
                <ThemeToggle />
              </div>

            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar;