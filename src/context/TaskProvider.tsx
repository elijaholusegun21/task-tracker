import {
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

import { TaskContext } from "./TaskContext";
import { taskReducer } from "../reducer/TaskReducer";
import type { Task } from "../types/Task";

export const TaskProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    taskReducer,
    { tasks: [] },
    (initialState) => {
      const storedTasks =
        localStorage.getItem("tasks");

      return storedTasks
        ? {
            tasks: JSON.parse(storedTasks),
          }
        : initialState;
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(state.tasks)
    );
  }, [state.tasks]);

  const addTask = (
    task: Omit<Task, "id" | "createdAt">
  ) => {
    dispatch({
      type: "ADD_TASK",
      payload: task,
    });
  };

  const deleteTask = (id: string) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  const toggleTaskStatus = (
    id: string
  ) => {
    dispatch({
      type: "TOGGLE_TASK_STATUS",
      payload: id,
    });
  };

  const updateTask = (
  id: string,
  title: string,
  description: string,
  status: Task["status"]
) => {
  dispatch({
    type: "UPDATE_TASK",
    payload: {
      id,
      title,
      description,
      status,
    },
  });
};

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        toggleTaskStatus,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};