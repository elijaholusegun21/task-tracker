import { createContext } from "react";
import type { Task } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];

  addTask: (
    task: Omit<Task, "id" | "createdAt">
  ) => void;

  deleteTask: (id: string) => void;

  toggleTaskStatus: (
    id: string
  ) => void;

  updateTask: (
    id: string,
    title: string,
    description: string,
    status: Task["status"],
    priority: Task["priority"],
    dueDate: string
  ) => void;
}

export const TaskContext =
  createContext<
    TaskContextType | undefined
  >(undefined);